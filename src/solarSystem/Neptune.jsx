import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";
import * as THREE from "three";

export let extGameOverNeptune = false; // Global game over state for Neptune

// Neptune component
const Neptune = React.memo(() => {
  const neptuneRef = useRef(); // Create a reference to the Neptune

  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state

  const [neptuneTexture] = useTexture(["assets/textures/neptune.jpg"]); // Load the Neptune's textures

  // this calculates the score when you hit neptune
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
  
  // Update the Neptune's position
  const updateneptunePosition = useCallback(() => {
    // Calculate the neptune' position based on its angle from the Sun
    const angle = 5 + clockRef.current.getElapsedTime() * 0.07;
    const distance = 90;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    neptuneRef.current.position.set(x, 0, z);
    neptuneRef.current.rotation.y += 0.002;
  }, []);

  // Check for collisions used in useFrame and triggers game over state
  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(neptuneRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 3 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverNeptune = true;
      //Msg For Game over Reason
      const message = "You went into Neptune... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updateneptunePosition();
    collisionCheck();
  });

  return (
    <group ref={neptuneRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[3, 32, 32]} />
        <meshPhongMaterial map={neptuneTexture} />
      </mesh>
    </group>
  );
});

export default Neptune;
