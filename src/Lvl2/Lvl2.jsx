import React, { useEffect, useState, Suspense } from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { SphereEnv } from "../SphereEnv";
import { MiniMap } from "./MiniMap";
import { Targets } from "./TargetsLvl2";
import { MotionBlur } from "../MotionBlur";
import { Asteroid } from "../Lvl1/Asteroid";
import { AnimatedSpaceship } from "./Lvl2SpaceShip";
import SolarSystem from "../solarSystem/SolarSystem";
import soundEffect from "/assets/audio/background.mp3"; // Replace with the path to your background music file
import { Howl, Howler } from "howler"; // Import Howler
import commander from "/assets/audio/Commander_voice_level_2.mp3"; // Replace with the path to your background music file
import { Bridge } from "./bridge";
import { BlackHole, extGameOverBlackHole } from "./blackhole";
import { Stats } from "@react-three/drei";
import { planePosition } from "./Lvl2SpaceShip";
import { extGameOverEarth } from "../solarSystem/Earth";
import { extGameOverMars } from "../solarSystem/Mars";
import { extGameOverSun } from "../solarSystem/Sun";
import { extGameOverMercury } from "../solarSystem/Mercury";
import { extGameOverVenus } from "../solarSystem/Venus";
import { extGameOverJupiter } from "../solarSystem/Jupiter";
import { extGameOverSaturn } from "../solarSystem/Saturn";
import { extGameOverUranus } from "../solarSystem/Uranus";
import { extGameOverNeptune } from "../solarSystem/Neptune";
import { useFrame } from "@react-three/fiber";
import { ShipExplosion } from "../shipExplosion";

export let externalShowSubtitles = false;

export let masterGameOverLvl2 = false;

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
  // display: "flex",
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
    if (
      extGameOverEarth ||
      extGameOverMars ||
      extGameOverSun ||
      extGameOverMercury ||
      extGameOverVenus ||
      extGameOverJupiter ||
      extGameOverSaturn ||
      extGameOverUranus ||
      extGameOverNeptune ||
      extGameOverBlackHole
    ) {
      setGameOver(true);
      masterGameOverLvl2 = true;
    }

    // Update the plane position
    setPlanePos(planePosition);
  });

  // Create an instance of the background music
  const backgroundMusic = new Howl({
    src: [soundEffect],
    loop: true,
  });
  // Create an instance of the second audio
  const secondAudio = new Howl({
    src: [commander],
    loop: false,
  });

  // Start playing the background music and the second audio when the component mounts
  useEffect(() => {
    backgroundMusic.volume(0.3); // Adjust the volume as needed
    backgroundMusic.play();

    secondAudio.volume(1.0); // Adjust the volume as needed
    secondAudio.play();

    externalShowSubtitles = true;

    // Add an event listener to the second audio to detect when it ends
    secondAudio.on("end", () => {
      externalShowSubtitles = false;
    });

    // Clean up the audio and event listener when the component unmounts
    return () => {
      backgroundMusic.stop();
      secondAudio.stop();
      secondAudio.off("end"); // Remove the event listener to prevent memory leaks
      externalShowSubtitles = false;
    };
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Stats />
      <SphereEnv />
      <Environment background={false} files={"assets/textures/space.hdr"} />

      <PerspectiveCamera makeDefault position={[0, 0, 0]} />
      <OrbitControls target={[0, 0, 160]} />
      <ambientLight intensity={0.3} />
      <Targets />

      {/* If game over, show ship explosion */}
      {gameOver && <ShipExplosion position={planePos} />}

      {/* If not game over, show animated ship */}
      {!gameOver && <AnimatedSpaceship />}

      <SolarSystem />
      <MiniMap />
      <Bridge
        position={[1, 1, 120]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
      <BlackHole
        position={[0, 2, 42.5]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
      <BlackHole
        position={[2, 3, 80]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
      <BlackHole
        position={[3, 2, 65]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
    </Suspense>
  );
}

export default App;
