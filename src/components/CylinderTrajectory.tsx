import { Cylinder, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Color } from "three";

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
	float alpha = vUv.y;
	vec4 color = vec4(uColor, alpha);
	gl_FragColor = color;
  }
  `
);

extend({ FadingMaterial });

function CylinderTrajectory({ cityPair }: { cityPair: [number, number, number, number] }) {
  console.log("cityPair", cityPair);
  return (
    <Cylinder args={[2, 2, 100]} position={[-20, 0, 220]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <fadingMaterial transparent={true} uColor={new Color(0.1, 0.5, 0.8)} />
    </Cylinder>
  );
}

export { CylinderTrajectory };
