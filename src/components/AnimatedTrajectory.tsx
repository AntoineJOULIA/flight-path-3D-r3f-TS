import { shaderMaterial, Tube } from "@react-three/drei";
import { Color, Curve, ShaderMaterial, Vector3 } from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { createCurveFromFlight, createSplineFromCityPair } from "../utils/geom";
import { isCityPairInput, TrajectoryInput } from "../types/types";

// the '?raw' indicates to Vite to import the content of the file as a string
import vertexShader from "../shaders/trajectories/trajectory.vert?raw";
import fragmentShader from "../shaders/trajectories/animated.frag?raw";
import { DEFAULT_TRAJECTORY_COLOR, DEFAULT_TRAJECTORY_RADIUS } from "../utils/constants";

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

type Props = {
  input: TrajectoryInput;
  size?: number;
  color?: Color;
};

function AnimatedTrajectory({ input, size = DEFAULT_TRAJECTORY_RADIUS, color = DEFAULT_TRAJECTORY_COLOR }: Props) {
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
    <Tube args={[curve, 200, size, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <movingMaterial ref={materialRef} transparent={true} uColor={color} uStartX={0} uEndX={0} />
    </Tube>
  );
}

export { AnimatedTrajectory };
