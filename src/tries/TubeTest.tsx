import { shaderMaterial, Tube } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";
import { CityPair } from "../types/types";
import { createSplineFromCityPair } from "../utils/geom";

const MovingMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(0.1, 0.5, 0.8),
    uStartX: 0,
    uEndX: 0,
  },
  `varying vec2 vUv;
  
 void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 } `,
  `varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uStartX;
  uniform float uEndX;

  void main() {
	float alpha = (vUv.x / (uStartX - uEndX)) - (uEndX / (uStartX - uEndX));
	if (vUv.x < mod(uEndX, 1.)) {
		alpha = 0.0;
	} else if (vUv.x > mod(uStartX, 1.)) {
		alpha = 0.0;
	}
	vec4 color = vec4(uColor, alpha);
	gl_FragColor = color;
  }
  `
);
extend({ MovingMaterial });

function TubeTest({ cityPair }: { cityPair: CityPair }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null!);

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

export { TubeTest };
