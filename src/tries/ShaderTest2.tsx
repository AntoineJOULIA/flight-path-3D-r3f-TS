import { Cylinder } from "@react-three/drei";
import { useRef } from "react";
import { Color, Mesh } from "three";

// exemple found on https://onion2k.github.io/r3f-by-example/examples/materials/shader-material/
const OpacityVaryingMaterial = {
  uniforms: {
    time: { value: 0 },
    color: { value: new Color(1, 0, 0) },
  },
  vertexShader: `varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,
  fragmentShader: `varying vec2 vUv;
uniform float time;
uniform vec3 color;
void main() {
	float alpha = vUv.y;
	vec4 fragColor = vec4(color, alpha);
	gl_FragColor = fragColor;
}`,
};

// extend({ ColorMaterial });

function ShaderTest2() {
  const ref = useRef<Mesh>(null!);
  return (
    <Cylinder ref={ref} args={[5, 5, 100, 10, 10]} position={[20, 0, 220]}>
      <shaderMaterial attach="material" args={[OpacityVaryingMaterial]} transparent={true} />
    </Cylinder>
  );
}

export { ShaderTest2 };
