import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";
import * as THREE from "three";

export let extGameOverJupiter = false;

const Jupiter = React.memo(() => {
  const jupiterRef = useRef();

  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false);

  const [jupiterTexture] = useTexture(["assets/textures/jupiter.jpg"]);

  const scoreCalculator = () => {
    let score = 0;
  
    if (timeAliveExternal <= 75) {
      score = 200 * (1 / timeAliveExternal) + (5 * collectedObjs);
    } else if (timeAliveExternal > 75 && timeAliveExternal <= 150) {
      score = 500 * (1 / timeAliveExternal) + (10 * collectedObjs);
    } else if (timeAliveExternal > 150) {
      score = 500 * (1 / timeAliveExternal) + (5 * collectedObjs);
    }
    
    return Math.round(score);
  };
  

  const updatejupiterPosition = useCallback(() => {
    // Calculate the jupiter' position based on its angle from the Sun
    const angle = 20 + clockRef.current.getElapsedTime() * 0.1;
    const distance = 55;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    jupiterRef.current.position.set(x, 0, z);
    jupiterRef.current.rotation.y += 0.002;
  }, []);

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(jupiterRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 4 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverJupiter = true;
      //Msg For Game over Reason
      const message = "You went into Jupiter... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updatejupiterPosition();
    collisionCheck();
  });

  return (
    <group ref={jupiterRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[4, 32, 32]} />
        <meshPhongMaterial map={jupiterTexture} />
      </mesh>
    </group>
  );
});

export default Jupiter;
