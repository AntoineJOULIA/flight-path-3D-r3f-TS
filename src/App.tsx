import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { Color } from "three";
import { System } from "./components/System";

function App() {
  const backgroundColor = new Color("black");
  return (
    <div className="h-screen">
      <Canvas scene={{ background: backgroundColor }} camera={{ position: [0, 300, 300] }}>
        <OrbitControls />
        <hemisphereLight color="white" groundColor="white" intensity={3} />
        <ambientLight intensity={5} />
        <Suspense fallback={null}>
          <System />
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  );
}

export default App;
