import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import { Flight, FlightSegment } from "../types/types";
import { cityPairs } from "../utils/cityPairs";
import { getFlightsFromSegments } from "../utils/helpers";
import { Earth } from "./Earth";
import { Trajectory } from "./Trajectory";

function System() {
  const [flights, setFlights] = useState<Flight[]>([]);
  // The exclamation mark is a non-null assertion that will let TS know that ref.current is defined when we access it in effects.
  const ref = useRef<Group>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.0;
  });

  useEffect(() => {
    import("../assets/data/2019_06_04-ALL_CRZ_FL_370.json")
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .then(({ default: flightSegments }) => flightSegments as FlightSegment[])
      .then((flightSegments) => getFlightsFromSegments(flightSegments))
      .then((flights) => setFlights(flights));
  }, []);

  return (
    <group ref={ref}>
      <Earth />
      {flights.length > 0 &&
        flights.map((flight) => <Trajectory key={flight[0].callSign} input={flight} display="animated" />)}
      <Trajectory display="static" input={cityPairs[0]} />
      {/* <AnimatedFlightTrajectory flight={flight} />
      {cityPairs.map((cityPair) => (
        <AnimatedCityPairTrajectory key={`${cityPair[0] - cityPair[1]}`} cityPair={cityPair} />
      ))} */}
    </group>
  );
}

export { System };
