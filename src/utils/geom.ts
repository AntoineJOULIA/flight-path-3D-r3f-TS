import { geoInterpolate } from "d3-geo";
import { CubicBezierCurve3, Vector3 } from "three";
import { MathUtils } from "three/src/math/MathUtils";
import { CURVE_MAX_ALTITUDE, CURVE_MIN_ALTITUDE, EARTH_RADIUS } from "./constants";

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

function coordinateToPosition(lat: number, lon: number, radius: number) {
  const phi = MathUtils.degToRad(90 - lat);
  const theta = MathUtils.degToRad(lon + 180);

  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createSplineFromCoords(coords: [number, number, number, number]) {
  const [startLat, startLon, endLat, endLon] = coords;

  const startPosition = coordinateToPosition(startLat, startLon, EARTH_RADIUS);
  const endPosition = coordinateToPosition(endLat, endLon, EARTH_RADIUS);
  const altitude = clamp(startPosition.distanceTo(endPosition) * 0.75, CURVE_MIN_ALTITUDE, CURVE_MAX_ALTITUDE);
  const interpolate = geoInterpolate([startLon, startLat], [endLon, endLat]);
  const midCoord1 = interpolate(0.25);
  const midCoord2 = interpolate(0.75);
  const mid1 = coordinateToPosition(midCoord1[1], midCoord1[0], EARTH_RADIUS + altitude);
  const mid2 = coordinateToPosition(midCoord2[1], midCoord2[0], EARTH_RADIUS + altitude);

  return { startPosition, endPosition, spline: new CubicBezierCurve3(startPosition, mid1, mid2, endPosition) };
}

export { createSplineFromCoords };
