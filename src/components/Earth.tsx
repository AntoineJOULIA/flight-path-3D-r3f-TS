import { Sphere } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import earthTexture from "../assets/textures/earth_night.jpg";

function Earth() {
  const texture = useLoader(TextureLoader, earthTexture);
  return (
    <Sphere args={[200, 40, 30]}>
      <meshStandardMaterial map={texture} color={0xffffff} />
    </Sphere>
  );
}

export { Earth };
