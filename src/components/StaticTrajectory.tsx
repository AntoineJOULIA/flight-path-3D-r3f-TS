import { StaticCityPairTrajectory } from "./StaticCityPairTrajectory";
import { StaticFlightTrajectory } from "./StaticFlightTrajectory";
import { isCityPairInput, TrajectoryInput } from "./Trajectory";

type Props = { input: TrajectoryInput };
function StaticTrajectory(props: Props) {
  if (isCityPairInput(props.input)) {
    return <StaticCityPairTrajectory cityPair={props.input} />;
  }
  return <StaticFlightTrajectory flight={props.input} />;
}

export { StaticTrajectory };
