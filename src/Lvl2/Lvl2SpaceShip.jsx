import React, { useRef, useEffect, useState, useContext } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Quaternion, Vector3 } from "three";
import { updatePlaneAxis } from "../controls";
import { buildStyles } from "react-circular-progressbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Flame } from "../flame";
import { JustSpaceshhip } from "../justSpaceship";
import { NUM_TARGETS, collectedObjs } from "./TargetsLvl2";
import { Reticle } from "../Reticle";

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(1, 2, 110);
// export const planePosition = new Vector3(10, 0, 0);
export let timeAliveExternal = 0;

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

// Custom hook to detect the shift key press
function useKeyPress(targetKey) {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setIsKeyPressed(true);
    }
  }

  function upHandler({ key }) {
    if (key === targetKey) {
      setIsKeyPressed(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return isKeyPressed;
}

// Custom hook to detect the "P" key press
function usePKeyPress() {
  const [isPKeyPressed, setIsPKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key.toLowerCase() === "p") {
      setIsPKeyPressed((prev) => !prev);
    }
  }

  function upHandler({ key }) {
    if (key.toLowerCase() === "p") {
      setIsPKeyPressed((prev) => prev);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return isPKeyPressed;
}

// Hierarchical modelling of the spaceship
export function AnimatedSpaceship(props) {
  const group = useRef();

  const groupRef = useRef();

  const [timeAlive, setTimeAlive] = useState(0);
  const [InternalcollectedObjs, setcollectedObjs] = useState(20);

  // Detect the shift key press
  const isShiftPressed = useKeyPress("Shift");

  // Detect the "P" key press
  const isPKeyPressed = usePKeyPress();

  useFrame(({ camera }) => {

    //black hole 1 gravitational pull logic
    const blackHolePosition = new Vector3(3, 2, 65);
    const spacecraftPosition = planePosition; // assuming planePosition is the position of the spacecraft

    const directionToBlackHole = new Vector3().subVectors(blackHolePosition, spacecraftPosition);
    const distanceToBlackHole = spacecraftPosition.distanceTo(blackHolePosition);

    const gravitationalRange = 3;  // adjust this value as needed
    const gravitationalStrength = 0.01;  // adjust this value as needed

    if (distanceToBlackHole < gravitationalRange) {
      const force = directionToBlackHole.normalize().multiplyScalar(gravitationalStrength);

      spacecraftPosition.add(force);
    }

    //black hole 2 gravitational pull logic
    const blackHolePosition2 = new Vector3(2, 3, 80);
    const spacecraftPosition2 = planePosition; // assuming planePosition is the position of the spacecraft

    const directionToBlackHole2 = new Vector3().subVectors(blackHolePosition2, spacecraftPosition2);
    const distanceToBlackHole2 = spacecraftPosition2.distanceTo(blackHolePosition2);

    const gravitationalRange2 = 3;  // adjust this value as needed
    const gravitationalStrength2 = 0.01;  // adjust this value as needed

    if (distanceToBlackHole2 < gravitationalRange2) {
      const force = directionToBlackHole2.normalize().multiplyScalar(gravitationalStrength2);

      spacecraftPosition2.add(force);
    }

    //black hole 3 gravitational pull logic
    const blackHolePosition3 = new Vector3(0, 2, 42.5);
    const spacecraftPosition3 = planePosition; // assuming planePosition is the position of the spacecraft

    const directionToBlackHole3 = new Vector3().subVectors(blackHolePosition3, spacecraftPosition3);
    const distanceToBlackHole3 = spacecraftPosition3.distanceTo(blackHolePosition3);

    const gravitationalRange3 = 3;  // adjust this value as needed
    const gravitationalStrength3 = 0.01;  // adjust this value as needed

    if (distanceToBlackHole3 < gravitationalRange3) {
      const force = directionToBlackHole3.normalize().multiplyScalar(gravitationalStrength3);

      spacecraftPosition2.add(force);
    }
    
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

    // Toggle the boolean value dynamically based on "P" key press
    const translationValue = isPKeyPressed ? 0.01 : 0.015;
    const translationZValue = isPKeyPressed ? 0.01 : 0.3;

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
      .multiply(new Matrix4().makeTranslation(0, translationValue, translationZValue));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    // helixMeshRef.current.rotation.z -= 1.0;

    timeAliveExternal = timeAlive;
    
    setcollectedObjs(collectedObjs);

  });

  // Use setInterval to increase timeAlive every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAlive((prevTimeAlive) => prevTimeAlive + 1);
    }, 1000); // 1000 milliseconds = 1 second

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={group} {...props} dispose={null} scale={0.01}>
         <Html position={[-7.5, 1, 7]}>
           <div style={{ width: 100, height: 100 }}>
             <CircularProgressbar
              value={InternalcollectedObjs/NUM_TARGETS * 100}
              text={`${InternalcollectedObjs}/${NUM_TARGETS}`}
               styles={buildStyles({
                 // Rotation of path and trail, in number of turns (0-1)
                 rotation: 0.25,

                 // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                 strokeLinecap: "butt",

                 // Text size
                 textSize: "16px",

                 // How long animation takes to go from one percentage to another, in seconds
                 pathTransitionDuration: 0.5,

                 // Can specify path transition in more detail, or remove it entirely
                 // pathTransition: 'none',

                 // Colors
                 pathColor: "#66ff00",
                 textColor: "#ffffff",
                 trailColor: "#d6d6d6",
                 backgroundColor: "#3e98c7",
               })}
             />
           </div>
         </Html>
         <Html position={[4, 1, 7]}>
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={timeAlive}
              text={`${timeAlive}s`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "16px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: "#66ff00",
                textColor: "#ffffff",
                trailColor: "#66ff00",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </Html>

        {!isPKeyPressed && <JustSpaceshhip />}

        {isPKeyPressed && <Reticle />}

        <group
          name="Flames"
          position={isShiftPressed ? [1, 0, 10] : [1, 0, 6]}
          scale={isShiftPressed ? 2 : 1}
        >
          {!isPKeyPressed && <Flame />}
        </group>

        <group
          name="Flames"
          position={isShiftPressed ? [-1, 0, 10] : [-1, 0, 6]}
          scale={isShiftPressed ? 2 : 1}
        >
          {!isPKeyPressed && <Flame />}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/justSpaceship.glb");
