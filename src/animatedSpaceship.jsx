/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Dinendra Neyo (https://sketchfab.com/NeyoZ)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/multi-universe-space-ship-3d-model-42a2cbc97d9c489b80c6533c44294d55
Title: Multi Universe Space Ship 3D Model
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Quaternion, Vector3 } from "three";
import { updatePlaneAxis } from "./controls";

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(0, 3, 7);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export function AnimatedSpaceship(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "assets/models/animatedSpaceship.glb"
  );
  const { actions, mixer } = useAnimations(animations, group);
  const groupRef = useRef();

  useEffect(() => {
    actions.Animation.play();
  }, [mixer]);

  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    var quaternionA = new Quaternion().copy(delayedQuaternion);

    // warning! setting the quaternion from the rotation matrix will cause
    // issues that resemble gimbal locks, instead, always use the quaternion notation
    // throughout the slerping phase
    // quaternionA.setFromRotationMatrix(delayedRotMatrix);

    var quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    var interpolationFactor = 0.175;
    var interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(new Matrix4().makeTranslation(0, 0.015, 0.3));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    // helixMeshRef.current.rotation.z -= 1.0;
  });

  return (
    <group ref={groupRef}>
      <group
        ref={group}
        {...props}
        dispose={null}
        scale={0.01}
        rotation={[0, Math.PI, 0]}
      >
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="root">
              <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                <group
                  name="Baked_Animations_Intergalactic_Spaceships_Version_2_0"
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="Object_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials["Material.001"]}
                  />
                </group>
                <group name="Empty_9" position={[-1.075, 0.256, -5.542]} />
                <group name="Empty001_10" position={[1.149, 0.253, -5.541]} />
                <group
                  name="Circle_11"
                  position={[-1.025, 0.18, -5.284]}
                  scale={[1.021, 1.021, 1.487]}
                >
                  <mesh
                    name="Object_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials["Material.002"]}
                  />
                </group>
                <group
                  name="Circle001_12"
                  position={[1.033, 0.175, -5.274]}
                  scale={[1.021, 1.021, 1.487]}
                >
                  <mesh
                    name="Object_10"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_10.geometry}
                    material={materials["Material.002"]}
                  />
                </group>
                <group
                  name="Torus000_13"
                  position={[1.034, 0.175, -9.674]}
                  rotation={[0, 0, -0.628]}
                  scale={0.037}
                >
                  <mesh
                    name="mesh_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.mesh_3.geometry}
                    material={materials["Material.003"]}
                    morphTargetDictionary={nodes.mesh_3.morphTargetDictionary}
                    morphTargetInfluences={nodes.mesh_3.morphTargetInfluences}
                  />
                </group>
                <group
                  name="Torus001_14"
                  position={[-1.025, 0.18, -8.707]}
                  rotation={[0, 0, -1.885]}
                  scale={0.239}
                >
                  <mesh
                    name="Object_14"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_14.geometry}
                    material={materials["Material.003"]}
                  />
                </group>
                <group
                  name="Torus002_15"
                  position={[-1.025, 0.18, -7.729]}
                  rotation={[0, 0, -3.142]}
                  scale={0.89}
                >
                  <mesh
                    name="mesh_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.mesh_5.geometry}
                    material={materials["Material.003"]}
                    morphTargetDictionary={nodes.mesh_5.morphTargetDictionary}
                    morphTargetInfluences={nodes.mesh_5.morphTargetInfluences}
                  />
                </group>
                <group
                  name="Torus003_16"
                  position={[-1.025, 0.18, -6.751]}
                  rotation={[0, 0, -1.885]}
                  scale={1.229}
                >
                  <mesh
                    name="mesh_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.mesh_6.geometry}
                    material={materials["Material.003"]}
                    morphTargetDictionary={nodes.mesh_6.morphTargetDictionary}
                    morphTargetInfluences={nodes.mesh_6.morphTargetInfluences}
                  />
                </group>
                <group
                  name="Torus004_17"
                  position={[-1.025, 0.18, -5.773]}
                  rotation={[0, 0, -0.139]}
                  scale={1.06}
                >
                  <mesh
                    name="Object_20"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_20.geometry}
                    material={materials["Material.003"]}
                  />
                </group>
                <group
                  name="Torus005_18"
                  position={[1.033, 0.175, -6.741]}
                  rotation={[0, 0, -1.885]}
                  scale={1.229}
                >
                  <mesh
                    name="mesh_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.mesh_8.geometry}
                    material={materials["Material.003"]}
                    morphTargetDictionary={nodes.mesh_8.morphTargetDictionary}
                    morphTargetInfluences={nodes.mesh_8.morphTargetInfluences}
                  />
                </group>
                <group
                  name="Torus006_19"
                  position={[1.033, 0.175, -7.719]}
                  rotation={[0, 0, -3.142]}
                  scale={0.89}
                >
                  <mesh
                    name="mesh_9"
                    castShadow
                    receiveShadow
                    geometry={nodes.mesh_9.geometry}
                    material={materials["Material.003"]}
                    morphTargetDictionary={nodes.mesh_9.morphTargetDictionary}
                    morphTargetInfluences={nodes.mesh_9.morphTargetInfluences}
                  />
                </group>
                <group
                  name="Torus007_20"
                  position={[1.033, 0.175, -8.696]}
                  rotation={[0, 0, -1.885]}
                  scale={0.239}
                >
                  <mesh
                    name="Object_26"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_26.geometry}
                    material={materials["Material.003"]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/animatedSpaceship.glb");
