import { isCityPairInput, TrajectoryInput } from "./Trajectory";
import { shaderMaterial, Tube } from "@react-three/drei";
import { Color, Curve, ShaderMaterial, Vector3 } from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { createCurveFromFlight, createSplineFromCityPair } from "../utils/geom";

// the '?raw' indicates to Vite to import the content of the file as a string
import vertexShader from "../shaders/trajectories/trajectory.vert?raw";
import fragmentShader from "../shaders/trajectories/animated.frag?raw";

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

function AnimatedTrajectory({ input }: { input: TrajectoryInput }) {
  const materialRef = useRef<ShaderMaterial>(null!);

  useFrame(() => {
    materialRef.current.uniforms.uStartX.value += 0.001;
    if (materialRef.current.uniforms.uStartX.value > 0.2) {
      materialRef.current.uniforms.uEndX.value += 0.001;
    }
  });

  let curve: Curve<Vector3>;

  if (isCityPairInput(input)) {
    const { spline } = createSplineFromCityPair(input);
    curve = spline;
  } else {
    curve = createCurveFromFlight(input);
  }
  return (
    <Tube args={[curve, 200, 1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <movingMaterial ref={materialRef} transparent={true} uColor={new Color(0.1, 0.5, 0.8)} uStartX={0} uEndX={0} />
    </Tube>
  );
}

export { AnimatedTrajectory };
