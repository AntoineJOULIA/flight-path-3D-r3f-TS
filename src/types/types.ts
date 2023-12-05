export type CityPair = [startLat: number, startLon: number, endLat: number, endLon: number];

type Coordinates = [lon: number, lat: number, alt: number];

type FlightSegment = {
  aircraftType: string;
  callSign: string;
  departureAirport: string;
  arrivalAirport: string;
  start: Coordinates;
  end: Coordinates;
};

export type Flight = FlightSegment[];

export type TrajectoryDisplay = "line" | "static" | "animated";
export type TrajectoryInput = CityPair | Flight;

export function isCityPairInput(input: TrajectoryInput): input is CityPair {
  return (input as CityPair)[0] != undefined && (input as CityPair).length === 4;
}
