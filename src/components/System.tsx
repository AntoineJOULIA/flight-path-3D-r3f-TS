import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { cityPairs } from "../utils/cityPairs";
import { ShaderTest1 } from "../tries/ShaderTest1";
import { ShaderTest2 } from "../tries/ShaderTest2";
import { Earth } from "./Earth";
import { LineTrajectory } from "./LineTrajectory";

function System() {
  // The exclamation mark is a non-null assertion that will let TS know that ref.current is defined when we access it in effects.
  const ref = useRef<Group>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.0;
  });

  return (
    <group ref={ref}>
      <Earth />
      {cityPairs.map((cityPair) => (
        <LineTrajectory key={`${cityPair[0] - cityPair[1]}`} coords={cityPair} />
      ))}
      <ShaderTest1 />
      <ShaderTest2 />
    </group>
  );
}

export { System };
