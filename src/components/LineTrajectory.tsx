import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { isCityPairInput, TrajectoryInput } from "../types/types";
import { CURVE_SEGMENTS } from "../utils/constants";
import { createCurveFromFlight, createSplineFromCityPair } from "../utils/geom";

function LineTrajectory({ input }: { input: TrajectoryInput }) {
  let points: Vector3[] = [];
  if (isCityPairInput(input)) {
    const { spline } = createSplineFromCityPair(input);
    points = spline.getPoints(CURVE_SEGMENTS - 1);
  } else {
    const curve = createCurveFromFlight(input);
    points = curve.getPoints(CURVE_SEGMENTS - 1);
  }
  return <Line points={points} color="skyblue" linewidth={1}></Line>;
}
export { LineTrajectory };
