import { shaderMaterial, Tube } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Color } from "three";
import { Flight } from "../types/types";
import { createCurveFromFlight } from "../utils/geom";

const FadingMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(0.1, 0.5, 0.8),
  },
  `varying vec2 vUv;
  
 void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 } `,
  `varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;

  void main() {
	float alpha = vUv.x;
	vec4 color = vec4(uColor, alpha);
	gl_FragColor = color;
  }
  `
);
extend({ FadingMaterial });

function TubeFlightTrajectory({ flight }: { flight: Flight }) {
  const curve = createCurveFromFlight(flight);

  return (
    <Tube args={[curve, 200, 0.1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <fadingMaterial transparent={true} uColor={new Color(0.1, 0.5, 0.8)} />
    </Tube>
  );
}

export { TubeFlightTrajectory };
