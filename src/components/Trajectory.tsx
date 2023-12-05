import { LineTrajectory } from "./LineTrajectory";
import { StaticTrajectory } from "./StaticTrajectory";
import { AnimatedTrajectory } from "./AnimatedTrajectory";
import { TrajectoryDisplay, TrajectoryInput } from "../types/types";
import { Color } from "three";

type TrajectoryProps = {
  input: TrajectoryInput;
  display: TrajectoryDisplay;
  size?: number;
  color?: Color;
};

function Trajectory({ display, ...props }: TrajectoryProps) {
  switch (display) {
    case "line":
      return <LineTrajectory {...props} />;
    case "static":
      return <StaticTrajectory {...props} />;
    case "animated":
      return <AnimatedTrajectory {...props} />;
    default:
      // Will cause an error if all the cases of 'display' are not treated
      exhaustiveGuard(display);
  }
}

function exhaustiveGuard(value: never): never {
  throw new Error(`ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(value)}`);
}

export { Trajectory };
