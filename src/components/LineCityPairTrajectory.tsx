import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { CityPair } from "../types/types";
import { CURVE_SEGMENTS } from "../utils/constants";
import { createSplineFromCityPair } from "../utils/geom";

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

export { LineCityPairTrajectory };
