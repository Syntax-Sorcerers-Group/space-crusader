/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Astronaut(props) {
  const { nodes, materials } = useGLTF("assets/models/astronaut-with-shield.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[11.311, -30.793, -9.558]}
        rotation={[3.042, 0, 0]}
        scale={1.208}
      >
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
        />
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.material_0}
        />
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.material_0}
        />
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.material_0}
        />
      </group>
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Sphere_6_A_1.geometry}
        material={materials.material_1}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Sphere_6_M_0.geometry}
        material={materials.material}
      />
    </group>
  );
}

useGLTF.preload("assets/models/astronaut-with-shield.glb");