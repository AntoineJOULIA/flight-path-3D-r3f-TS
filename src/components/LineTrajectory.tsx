import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { CityPair, Flight } from "../types/types";
import { CURVE_SEGMENTS } from "../utils/constants";
import { createCurveFromFlight, createSplineFromCityPair } from "../utils/geom";
import { isCityPairInput, TrajectoryInput } from "./Trajectory";

function LineTrajectory({ input }: { input: TrajectoryInput }) {
  if (isCityPairInput(input)) {
    return <LineCityPairTrajectory cityPair={input} />;
  }
  return <LineFlightTrajectory flight={input} />;
}

function LineCityPairTrajectory({ cityPair }: { cityPair: CityPair }) {
  const { spline } = createSplineFromCityPair(cityPair);
  const points: Vector3[] = [];
  const vertices = spline.getPoints(CURVE_SEGMENTS - 1);

  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    points.push(vertex);
  }

  return <Line points={points} color="skyblue" linewidth={1}></Line>;
}

function LineFlightTrajectory({ flight }: { flight: Flight }) {
  const curve = createCurveFromFlight(flight);
  const points: Vector3[] = [];
  const vertices = curve.getPoints(CURVE_SEGMENTS - 1);

  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    points.push(vertex);
  }

  return <Line points={points} color="skyblue" linewidth={1}></Line>;
}

export { LineTrajectory };
