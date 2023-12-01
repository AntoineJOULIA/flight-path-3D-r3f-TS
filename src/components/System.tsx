import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { cityPairs } from "../utils/cityPairs";
import { Earth } from "./Earth";
import { TubeTrajectory } from "./TubeTrajectory";

function System() {
  // The exclamation mark is a non-null assertion that will let TS know that ref.current is defined when we access it in effects.
  const ref = useRef<Group>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={ref}>
      <Earth />
      {cityPairs.map((cityPair) => (
        <TubeTrajectory key={`${cityPair[0] - cityPair[1]}`} cityPair={cityPair} />
      ))}
    </group>
  );
}

export { System };
