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
