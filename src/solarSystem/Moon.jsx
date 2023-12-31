import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";

export let extGameOverMoon = false; // Global game over state for Moon

// Moon component
const Moon = React.memo(() => {
  const moonRef = useRef(); // Create a reference to the Moon
  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state

  const [moonTexture] = useTexture(["assets/textures/moon_map.jpg"]); // Load the Moon's textures
  const xAxis = 4;

  // this calculates the score when you hit moon
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
  
  // Update the Moon's position
  const updateMoonPosition = useCallback(() => {
    // Orbit Rotation
    moonRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * 0.8) * xAxis;
    moonRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * 0.8) * xAxis;
    // Axis Rotation
    moonRef.current.rotation.y += 0.002;
  }, []);

  // Check for collisions used in useFrame and triggers game over state
  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(moonRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 0.3 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverMoon = true;
      //Msg For Game over Reason
      const message = "You went into the Moon... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updateMoonPosition();
    collisionCheck();
  });

  return (
    <mesh castShadow receiveShadow ref={moonRef} position={[xAxis, 0, 0]}>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshPhongMaterial
        map={moonTexture}
        emissiveMap={moonTexture}
        emissive={0xffffff}
        emissiveIntensity={0.05}
      />
    </mesh>
  );
});

export default Moon;
