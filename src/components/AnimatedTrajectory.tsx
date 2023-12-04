import { AnimatedCityPairTrajectory } from "./AnimatedCityPairTrajectory";
import { AnimatedFlightTrajectory } from "./AnimatedFlightTrajectory";
import { isCityPairInput, TrajectoryInput } from "./Trajectory";

type Props = { input: TrajectoryInput };

function AnimatedTrajectory(props: Props) {
  if (isCityPairInput(props.input)) {
    return <AnimatedCityPairTrajectory cityPair={props.input} />;
  }
  return <AnimatedFlightTrajectory flight={props.input} />;
}

export { AnimatedTrajectory };
