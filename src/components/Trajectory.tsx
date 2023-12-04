import { CityPair, Flight } from "../types/types";
import { LineTrajectory } from "./LineTrajectory";
import { StaticTrajectory } from "./StaticTrajectory";
import { AnimatedTrajectory } from "./AnimatedTrajectory";

type TrajectoryDisplay = "line" | "static" | "animated";
export type TrajectoryInput = CityPair | Flight;

type TrajectoryProps = {
  input: TrajectoryInput;
  display: TrajectoryDisplay;
};

export function isCityPairInput(input: TrajectoryInput): input is CityPair {
  return (input as CityPair)[0] != undefined && (input as CityPair).length === 4;
}

function Trajectory({ display, input }: TrajectoryProps) {
  switch (display) {
    case "line":
      return <LineTrajectory input={input} />;
    case "static":
      return <StaticTrajectory input={input} />;
    case "animated":
      return <AnimatedTrajectory input={input} />;
    default:
      // TODO impossible -> return a never type
      return <LineTrajectory input={input} />;
  }
}

export { Trajectory };
