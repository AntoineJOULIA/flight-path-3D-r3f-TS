import { isCityPairInput, TrajectoryInput } from "./Trajectory";
import { shaderMaterial, Tube } from "@react-three/drei";
import { Color, ShaderMaterial } from "three";
import { CityPair, Flight } from "../types/types";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { createCurveFromFlight, createSplineFromCityPair } from "../utils/geom";

// the '?raw' indicates to Vite to import the content of the file as a string
import vertexShader from "../shaders/trajectories/vertex.glsl?raw";
import fragmentShader from "../shaders/trajectories/fragment.glsl?raw";

function AnimatedTrajectory({ input }: { input: TrajectoryInput }) {
  if (isCityPairInput(input)) {
    return <AnimatedCityPairTrajectory cityPair={input} />;
  }
  return <AnimatedFlightTrajectory flight={input} />;
}

const MovingMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(0.1, 0.5, 0.8),
    uStartX: 0,
    uEndX: 0,
  },
  vertexShader,
  fragmentShader
);
extend({ MovingMaterial });

function AnimatedCityPairTrajectory({ cityPair }: { cityPair: CityPair }) {
  const materialRef = useRef<ShaderMaterial>(null!);

  const { spline } = createSplineFromCityPair(cityPair);

  useFrame(() => {
    materialRef.current.uniforms.uStartX.value += 0.001;
    if (materialRef.current.uniforms.uStartX.value > 0.2) {
      materialRef.current.uniforms.uEndX.value += 0.001;
    }
  });

  return (
    <Tube args={[spline, 200, 1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <movingMaterial ref={materialRef} transparent={true} uColor={new Color(0.1, 0.5, 0.8)} uStartX={0} uEndX={0} />
    </Tube>
  );
}

function AnimatedFlightTrajectory({ flight }: { flight: Flight }) {
  const materialRef = useRef<ShaderMaterial>(null!);

  useFrame(() => {
    materialRef.current.uniforms.uStartX.value += 0.001;
    if (materialRef.current.uniforms.uStartX.value > 0.2) {
      materialRef.current.uniforms.uEndX.value += 0.001;
    }
  });

  const curve = createCurveFromFlight(flight);

  return (
    <Tube args={[curve, 200, 0.1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <movingMaterial ref={materialRef} transparent={true} uColor={new Color(0.1, 0.5, 0.8)} uStartX={0} uEndX={0} />
    </Tube>
  );
}

export { AnimatedTrajectory };
