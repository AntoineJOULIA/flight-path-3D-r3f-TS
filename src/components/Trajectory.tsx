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
      // TODO impossible -> return a never type
      return <LineTrajectory input={input} />;
  }
}

export { Trajectory };
