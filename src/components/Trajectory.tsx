import { LineTrajectory } from "./LineTrajectory";
import { StaticTrajectory } from "./StaticTrajectory";
import { AnimatedTrajectory } from "./AnimatedTrajectory";
import { TrajectoryDisplay, TrajectoryInput } from "../types/types";

type TrajectoryProps = {
  input: TrajectoryInput;
  display: TrajectoryDisplay;
};

function Trajectory({ display, input }: TrajectoryProps) {
  switch (display) {
    case "line":
      return <LineTrajectory input={input} />;
    case "static":
      return <StaticTrajectory input={input} />;
    case "animated":
      return <AnimatedTrajectory input={input} />;
    default:
      // Will cause an error if all the cases of 'display' are not treated
      exhaustiveGuard(display);
  }
}

function exhaustiveGuard(value: never): never {
  throw new Error(`ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(value)}`);
}

export { Trajectory };
