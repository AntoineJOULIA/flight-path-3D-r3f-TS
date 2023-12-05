import { Line } from "@react-three/drei";
import { Color, Vector3 } from "three";
import { isCityPairInput, TrajectoryInput } from "../types/types";
import { CURVE_SEGMENTS, DEFAULT_TRAJECTORY_COLOR, DEFAULT_TRAJECTORY_RADIUS } from "../utils/constants";
import { createCurveFromFlight, createSplineFromCityPair } from "../utils/geom";

type Props = {
  input: TrajectoryInput;
  size?: number;
  color?: Color;
};

function LineTrajectory({ input, size = DEFAULT_TRAJECTORY_RADIUS, color = DEFAULT_TRAJECTORY_COLOR }: Props) {
  let points: Vector3[] = [];
  if (isCityPairInput(input)) {
    const { spline } = createSplineFromCityPair(input);
    points = spline.getPoints(CURVE_SEGMENTS - 1);
  } else {
    const curve = createCurveFromFlight(input);
    points = curve.getPoints(CURVE_SEGMENTS - 1);
  }
  return <Line points={points} color={color} linewidth={size}></Line>;
}
export { LineTrajectory };
