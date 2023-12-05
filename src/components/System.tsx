import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { cityPairs } from "../utils/cityPairs";
import { flight } from "../utils/flight";
import { Earth } from "./Earth";
import { Trajectory } from "./Trajectory";

function System() {
  // The exclamation mark is a non-null assertion that will let TS know that ref.current is defined when we access it in effects.
  const ref = useRef<Group>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.0;
  });

  return (
    <group ref={ref}>
      <Earth />
      <Trajectory display="animated" input={flight} />
      <Trajectory display="static" input={cityPairs[0]} />
      {/* <AnimatedFlightTrajectory flight={flight} />
      {cityPairs.map((cityPair) => (
        <AnimatedCityPairTrajectory key={`${cityPair[0] - cityPair[1]}`} cityPair={cityPair} />
      ))} */}
    </group>
  );
}

export { System };
