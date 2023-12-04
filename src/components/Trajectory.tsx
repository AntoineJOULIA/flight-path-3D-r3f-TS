import { Box } from "@react-three/drei";
import { CityPair, Flight } from "../types/types";
import { LineTrajectory } from "./LineTrajectory";
import { StaticTrajectory } from "./StaticTrajectory";

type TrajectoryDisplay = "line" | "static" | "animated";
export type TrajectoryInput = CityPair | Flight;

// type T1 = {
//   display: "line";
//   input: CityPair | Flight;
// };
// type T2 = {
//   display: "static";
//   input: CityPair | Flight;
// };
// type T = T1 | T2;

type Trajectory = {
  input: TrajectoryInput;
  display: TrajectoryDisplay;
};

type TrajectoryProps = Trajectory;
//					    ^?

export function isCityPairInput(input: TrajectoryInput): input is CityPair {
  return (input as CityPair)[0] != undefined && (input as CityPair).length === 4;
}

function Trajectory({ display, input }: TrajectoryProps) {
  switch (display) {
    case "line":
      return <LineTrajectory input={input} />;
    case "static":
      return <StaticTrajectory input={input} />;
    default:
      return <Box />;
  }
}

export { Trajectory };
