import { Box, Line, shaderMaterial, Tube } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial, Vector3 } from "three";
import { CityPair, Flight } from "../types/types";
import { CURVE_SEGMENTS } from "../utils/constants";
import { createCurveFromFlight, createSplineFromCityPair } from "../utils/geom";

// the '?raw' indicates to Vite to import the content of the file as a string
import vertexShader from "../shaders/trajectories/vertex.glsl?raw";
import fragmentShader from "../shaders/trajectories/fragment.glsl?raw";
import { useRef } from "react";

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
      return <Box />;
  }
}

export { Trajectory };

// LINE TRAJECTORY
function LineTrajectory({ input }: { input: TrajectoryInput }) {
  if (isCityPairInput(input)) {
    return <LineCityPairTrajectory cityPair={input} />;
  }
  return <LineFlightTrajectory flight={input} />;
}

function LineCityPairTrajectory({ cityPair }: { cityPair: CityPair }) {
  const { spline } = createSplineFromCityPair(cityPair);
  const points: Vector3[] = [];
  const vertices = spline.getPoints(CURVE_SEGMENTS - 1);

  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    points.push(vertex);
  }

  return <Line points={points} color="skyblue" linewidth={1}></Line>;
}

function LineFlightTrajectory({ flight }: { flight: Flight }) {
  const curve = createCurveFromFlight(flight);
  const points: Vector3[] = [];
  const vertices = curve.getPoints(CURVE_SEGMENTS - 1);

  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    points.push(vertex);
  }

  return <Line points={points} color="skyblue" linewidth={1}></Line>;
}

// STATIC TRAJECTORY

function StaticTrajectory({ input }: { input: TrajectoryInput }) {
  if (isCityPairInput(input)) {
    return <StaticCityPairTrajectory cityPair={input} />;
  }
  return <StaticFlightTrajectory flight={input} />;
}

const FadingMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(0.1, 0.5, 0.8),
  },
  `varying vec2 vUv;
  
 void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 } `,
  `varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;

  void main() {
	float alpha = vUv.x;
	vec4 color = vec4(uColor, alpha);
	gl_FragColor = color;
  }
  `
);
extend({ FadingMaterial });

function StaticCityPairTrajectory({ cityPair }: { cityPair: CityPair }) {
  const { spline } = createSplineFromCityPair(cityPair);

  return (
    <Tube args={[spline, 200, 1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <fadingMaterial transparent={true} uColor={new Color(0.1, 0.5, 0.8)} />
    </Tube>
  );
}

function StaticFlightTrajectory({ flight }: { flight: Flight }) {
  const curve = createCurveFromFlight(flight);

  return (
    <Tube args={[curve, 200, 0.1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <fadingMaterial transparent={true} uColor={new Color(0.1, 0.5, 0.8)} />
    </Tube>
  );
}

// ANIMATED TRAJECTORY
function AnimatedTrajectory({ input }: { input: TrajectoryInput }) {
  if (isCityPairInput(input)) {
    return <AnimatedCityPairTrajectory cityPair={input} />;
  }
  return <AnimatedFlightTrajectory flight={input} />;
}

const MovingMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(0.1, 0.5, 0.8),
    uStartX: 0,
    uEndX: 0,
  },
  vertexShader,
  fragmentShader
);
extend({ MovingMaterial });

function AnimatedCityPairTrajectory({ cityPair }: { cityPair: CityPair }) {
  const materialRef = useRef<ShaderMaterial>(null!);

  const { spline } = createSplineFromCityPair(cityPair);

  useFrame(() => {
    materialRef.current.uniforms.uStartX.value += 0.001;
    if (materialRef.current.uniforms.uStartX.value > 0.2) {
      materialRef.current.uniforms.uEndX.value += 0.001;
    }
  });

  return (
    <Tube args={[spline, 200, 1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <movingMaterial ref={materialRef} transparent={true} uColor={new Color(0.1, 0.5, 0.8)} uStartX={0} uEndX={0} />
    </Tube>
  );
}

function AnimatedFlightTrajectory({ flight }: { flight: Flight }) {
  const materialRef = useRef<ShaderMaterial>(null!);

  useFrame(() => {
    materialRef.current.uniforms.uStartX.value += 0.001;
    if (materialRef.current.uniforms.uStartX.value > 0.2) {
      materialRef.current.uniforms.uEndX.value += 0.001;
    }
  });

  const curve = createCurveFromFlight(flight);

  return (
    <Tube args={[curve, 200, 0.1, 8]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <movingMaterial ref={materialRef} transparent={true} uColor={new Color(0.1, 0.5, 0.8)} uStartX={0} uEndX={0} />
    </Tube>
  );
}
