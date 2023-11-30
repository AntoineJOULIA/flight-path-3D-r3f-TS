import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { Earth } from "./components/Earth";
import { Color } from "three";

function App() {
  const backgroundColor = new Color("black");
  return (
    <div className="h-screen">
      <Canvas scene={{ background: backgroundColor }} camera={{ position: [0, 0, 500] }}>
        <OrbitControls />
        <hemisphereLight color="white" groundColor="white" intensity={3} />
        <ambientLight intensity={5} />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  );
}

export default App;
