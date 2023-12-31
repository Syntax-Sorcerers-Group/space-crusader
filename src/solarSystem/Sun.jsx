import React, { useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";

export let extGameOverSun = false; // Global game over state for Sun

// Function to load the sun model and check for collisions
export function Sun(props) {
  const { nodes, materials } = useGLTF("assets/models/Sun.glb"); // Load the sun model

  const [sunTexture] = useTexture(["assets/textures/sun.jpg"]); // Load the sun's textures
  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state
  const [timeAlive, setTimeAlive] = useState(0); // Use state to set the time alive

  // Scoring Algorithm logic
  const scoreCalculator = () => {
    let score = 0;
    const penalty = 50;
    if (timeAliveExternal <= 75) {
      score = 100 * (1 / timeAliveExternal) + (50 * collectedObjs);
    } else if (timeAliveExternal > 75 && timeAliveExternal <= 150) {
      score = 500 * (1 / timeAliveExternal) + (100 * collectedObjs);
    } else if (timeAliveExternal > 150) {
      score = 500 * (1 / timeAliveExternal) + (50 * collectedObjs);
    }
    score -= penalty;
    return Math.round(score);
  };
  
  // Define the center and radius of the green sphere
  const sphereCenter = new Vector3(0, 0, 0);
  const sphereRadius = 2.62;

  // Create a reference to the mesh
  const sphereRef = useRef();

  // Use useFrame for continuous collision detection
  useFrame(() => {
    // Calculate the distance between the plane position and the sphere center
    const distance = planePosition.distanceTo(sphereCenter);
    setTimeAlive(timeAliveExternal);

    // Check if the plane is inside the sphere
    if (distance < sphereRadius && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverSun = true;
      //Msg For Game over Reason
      const message = "You went into the sun... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Render the sun from the gltf */}
      <mesh
        ref={sphereRef}
        geometry={nodes.Object_4.geometry}
        material={materials["Scene_-_Root"]}
        scale={2.633}
      >
        <meshPhongMaterial
          map={sunTexture}
          emissiveMap={sunTexture}
          emissiveIntensity={0.6}
          emissive={0xffffff}
        />
        <pointLight castShadow />
      </mesh>
    </group>
  );
}

useGLTF.preload("assets/models/Sun.glb");
