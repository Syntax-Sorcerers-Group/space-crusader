import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial, Vector3 } from "three";
import { planePosition } from "./Lvl3Spaceship";
import { displayGameOver } from "../GameOver";
import { timeAliveExternal } from "./Lvl3Spaceship";

export function DeathStar(props) {
  const { nodes, materials } = useGLTF("assets/models/deathStar.glb");
  const [gameOver, setGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);

  // Define the center and radius of the green sphere
  const sphereCenter = new Vector3(5, 1, 1);
  const sphereRadius = 0.51;

  // Use effect to set the time alive
  useFrame(() => {
    setTimeAlive(timeAliveExternal);
  });

  // Use useFrame for continuous collision detection
  useFrame(() => {
    // Calculate the distance between the plane position and the sphere center
    const distance = planePosition.distanceTo(sphereCenter);

    // Check if the plane is inside the sphere
    if (distance < sphereRadius && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
      setGameOver(true);
      //Msg For Game over Reason
      const message =
        "You went into the death star... BRUH have you not watched Star Wars?";
      displayGameOver(leaderboardData, message);
    }
  });

  return (
    <group {...props} dispose={null} position={[5, 1, 1]}>
      <mesh
        scale={0.01}
        castShadow
        receiveShadow
        geometry={nodes.DeathStar001_1_0.geometry}
        material={materials.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        scale={0.01}
        castShadow
        receiveShadow
        geometry={nodes.DeathStar_misa001_2_0.geometry}
        material={materials.material_1}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/deathStar.glb");