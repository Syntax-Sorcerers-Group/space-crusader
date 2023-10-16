import React, { useState, Suspense } from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { SphereEnv } from "../SphereEnv";
import { MiniMap } from "./MiniMap";
import { Targets } from "./Targets";
import { MotionBlur } from "../MotionBlur";
import { Asteroid } from "./Asteroid";
import { AnimatedSpaceship, planePosition } from "./Lvl1Spaceship";
import { ShipExplosion } from "../shipExplosion";
import { externalGameOverAsteroid } from "./Asteroid";
import { useFrame } from "@react-three/fiber";
import { Html, useProgress, Stats } from "@react-three/drei";

export let masterGameOverLvl1 = false;

// Define a CSS class for the loading bar
const loadingBarStyle = {
  background: "white", // Blue background color
  width: "500px", // Set the width to 80% to represent progress
  height: "30px", // Set the height as needed
  borderRadius: "50px", // Rounded border
  border: "1px solid white", // Solid white border
  position: "relative", // Position relative to the parent
  margin: "0 auto", // Center horizontally
  marginTop: "50px", // Add some top margin
  boxShadow: "0 0 10px white", // Add a slight shadow
};

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const textStyle = {
  textAlign: "center",
  fontSize: "24px",
  margin: "20px 0",
  color: "blue",
  width: "500px",
};

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html>
      <div style={centerStyle}>
        <div>
          {/* <p style={textStyle}>
            This is your commander speaking...Let's see how long you can stay
            alive...Collect the fuel canisters to replenish your fuel
          </p> */}
          <div className="loading-bar" style={loadingBarStyle}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "blue",
                borderRadius: "inherit",
              }}
            ></div>
          </div>
          <p style={textStyle}>{Math.round(progress)} %</p>
        </div>
      </div>
    </Html>
  );
}

function App() {
  // Use state to set the external game over state
  const [gameOver, setGameOver] = useState(false);

  // Use state to set the plane position
  const [planePos, setPlanePos] = useState(planePosition);

  // Use frame to update the game over state
  useFrame(() => {
    if (externalGameOverAsteroid) {
      setGameOver(true);
      masterGameOverLvl1 = true;
    }

    // Update the plane position
    setPlanePos(planePosition);
  });

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Stats />
        <SphereEnv />
        <Environment background={false} files={"assets/textures/space.hdr"} />

        {/* Main perspective camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls target={[0, 0, 0]} />
        <ambientLight intensity={0.5} />

        {/* Other components */}
        {/* If game over, show ship explosion */}
        {gameOver && <ShipExplosion position={planePos} />}

        {/* If not game over, show animated ship */}
        {!gameOver && <AnimatedSpaceship />}
        <Targets />
        <Asteroid />

        {/* MiniMap with top-down OrthographicCamera */}
        <MiniMap />
      </Suspense>
    </>
  );
}

export default App;
