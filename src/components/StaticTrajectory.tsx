import { shaderMaterial, Tube } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Color, Curve, Vector3 } from "three";
import { createCurveFromFlight, createSplineFromCityPair } from "../utils/geom";
import { isCityPairInput, TrajectoryInput } from "../types/types";

import vertexShader from "../shaders/trajectories/trajectory.vert?raw";
import fragmentShader from "../shaders/trajectories/static.frag?raw";

const FadingMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(0.1, 0.5, 0.8),
  },
  vertexShader,
  fragmentShader
);
extend({ FadingMaterial });

function StaticTrajectory({ input }: { input: TrajectoryInput }) {
  let points: Curve<Vector3>;
  if (isCityPairInput(input)) {
    const { spline } = createSplineFromCityPair(input);
    points = spline;
  } else {
    const curve = createCurveFromFlight(input);
    points = curve;
  }
  return (
    <Tube args={[points, 200, 1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <fadingMaterial transparent={true} uColor={new Color(0.1, 0.5, 0.8)} />
    </Tube>
  );
}

export { StaticTrajectory };
