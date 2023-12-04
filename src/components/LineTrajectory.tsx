import { LineCityPairTrajectory } from "./LineCityPairTrajectory";
import { LineFlightTrajectory } from "./LineFlightTrajectory";
import { isCityPairInput, TrajectoryInput } from "./Trajectory";

type Props = { input: TrajectoryInput };
function LineTrajectory(props: Props) {
  if (isCityPairInput(props.input)) {
    return <LineCityPairTrajectory cityPair={props.input} />;
  }
  return <LineFlightTrajectory flight={props.input} />;
}

export { LineTrajectory };
