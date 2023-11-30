import { Sphere } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, TextureLoader } from "three";

import earthTexture from "../assets/textures/earth_night.jpg";

function Earth() {
  const texture = useLoader(TextureLoader, earthTexture);

  // The exclamation mark is a non-null assertion that will let TS know that ref.current is defined when we access it in effects.
  const earthRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    earthRef.current.rotation.y -= delta * 0.1;
  });
  return (
    <Sphere ref={earthRef} args={[200, 40, 30]}>
      <meshStandardMaterial map={texture} color={0xffffff} />
    </Sphere>
  );
}

export { Earth };
