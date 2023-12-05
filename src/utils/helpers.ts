import { Flight, FlightSegment } from "../types/types";

export function getFlightsFromSegments(flightSegments: FlightSegment[]) {
  const flightsSortedByCallSign = flightSegments.reduce((group: { [key: string]: FlightSegment[] }, flightSegment) => {
    const { callSign } = flightSegment;
    group[callSign] = group[callSign] ?? [];
    group[callSign].push(flightSegment);
    return group;
  }, {});
  const formattedResult: Flight[] = [];
  for (const f in flightsSortedByCallSign) {
    formattedResult.push(flightsSortedByCallSign[f]);
  }
  return formattedResult;
}
