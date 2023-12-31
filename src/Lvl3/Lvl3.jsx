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
import { Targets } from "./TargetsLvl3";
import { MotionBlur } from "../MotionBlur";
import { Asteroid } from "./Asteroid";
import { SpaceStation } from "../spaceStation";
import { MiniMap } from "./MiniMap";
import { Sun } from "./Sun";
import { AnimatedSpaceship } from "./Lvl3Spaceship";
import { DeathStar } from "./DeathStar";
import { Howl, Howler } from "howler"; // Import Howler
import soundEffect from "/assets/audio/background.mp3"; // Replace with the path to your background music file
import commander from "/assets/audio/commander.mp3"; // Replace with the path to your background music file
import { Stats } from "@react-three/drei";
import { ShipExplosion } from "../shipExplosion";
import { planePosition } from "./Lvl3Spaceship";
import { externalGameOverAsteroid } from "./Asteroid";
import { externalGameOverDeathStar } from "./DeathStar";
import { externalGameOverSun } from "./Sun";
import { externalGameOverBoost } from "./TargetsLvl3";
import { useFrame } from "@react-three/fiber";
import { displayGamePause, hideGamePause } from "../Completion"; // For Game Pause
export let externalShowSubtitles = false;

export let masterGameOverLvl3 = false;
let escKeytoggle = false;
const loadingBarContainerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const loadingBarStyle = {
  background: "white",
  width: "500px",
  height: "30px",
  borderRadius: "50px",
  border: "1px solid white",
  boxShadow: "0 0 10px white",
};

const textStyle = {
  color: "white",
  marginTop: "10px", // Add some top margin
  fontSize: "30px",
  textAlign: "center", // Center the text horizontally
};

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html>
      <div style={loadingBarContainerStyle}>
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
    </Html>
  );
}


// Custom hook to detect the "Esc" key press to pause or hide pause
function useEscKeyPress() {

  function upHandler({ key }) {
    if (key.toLowerCase() === "escape") {
      //esc not pressed
      if(!escKeytoggle){
        escKeytoggle = true
        displayGamePause(3);//Pass in current level parameter
      }
      //esc pressed
      else{
        escKeytoggle = false;
        hideGamePause();
      }
    }
  }

  useEffect(() => {
    // window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      // window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);


  return ;
}

// Encapsulates OOP concepts for lvl2
function Lvl3() {
  // Use state to set the external game over state
  const [gameOver, setGameOver] = useState(false);

  // Use state to set the plane position
  const [planePos, setPlanePos] = useState(planePosition);

  // Detect the "ESC" key press
  useEscKeyPress();

  // Use frame to update the game over state
  useFrame(() => {
    if (
      externalGameOverAsteroid ||
      externalGameOverSun ||
      externalGameOverDeathStar ||
      externalGameOverBoost
    ) {
      setGameOver(true);
      masterGameOverLvl3 = true;
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
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={0.5} />
      {/* <Landscape /> */}
      <SpaceStation />
      <Sun />
      <DeathStar />

      {/* If game over, show ship explosion */}
      {gameOver && <ShipExplosion position={planePos} />}

      {/* If not game over, show animated ship */}
      {!gameOver && <AnimatedSpaceship />}

      <Targets />
      <Asteroid />
      <MiniMap />
    </Suspense>
  );
}

export default Lvl3;
