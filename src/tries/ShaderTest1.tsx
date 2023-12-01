import { Cylinder, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Mesh } from "three";

// exemple found on https://codesandbox.io/p/sandbox/r3f-shader-material-yltgr?file=%2Fsrc%2Findex.js
const OpacityVaryingMaterial = shaderMaterial(
  { transparent: true, time: 0, color: new Color(1, 0, 0) },
  `varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,
  `varying vec2 vUv;
uniform float time;
uniform vec3 color;
void main() {
	float alpha = 1. - vUv.y;
	vec4 fragColor = vec4(color, alpha);
	gl_FragColor = fragColor;
}`
);

extend({ OpacityVaryingMaterial });

function ShaderTest1() {
  const ref = useRef<Mesh>(null!);
  return (
    <Cylinder ref={ref} args={[5, 5, 100, 10, 10]} position={[0, 0, 220]}>
      {/* <meshStandardMaterial wireframe={true} /> */}
      {/* @ts-ignore */}
      <opacityVaryingMaterial color={new Color(0.1, 0.1, 0.9)} />
    </Cylinder>
  );
}

export { ShaderTest1 };
