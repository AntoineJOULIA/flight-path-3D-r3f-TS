import { Cylinder, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Mesh } from "three";

// the '?raw' indicates to Vite to import the content of the file as a string
import vertexShader from "../shaders/tests/vertex.glsl?raw";
import fragmentShader from "../shaders/tests/fragment.glsl?raw";

// exemple found on https://codesandbox.io/p/sandbox/r3f-shader-material-yltgr?file=%2Fsrc%2Findex.js
const OpacityVaryingMaterial = shaderMaterial({ time: 0, color: new Color(0, 0, 0) }, vertexShader, fragmentShader);

extend({ OpacityVaryingMaterial });

function ShaderTest3() {
  const ref = useRef<Mesh>(null!);
  return (
    <Cylinder ref={ref} args={[5, 5, 100, 10, 10]} position={[0, 0, 220]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <opacityVaryingMaterial color={new Color(0.1, 0.1, 0.9)} transparent={true} />
    </Cylinder>
  );
}

export { ShaderTest3 };
