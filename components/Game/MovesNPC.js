import { degToRad } from "three/src/math/MathUtils.js";
import FlatArrow from "./FlatArrow";

import { useStore } from "@/hooks/useStore";

import Duck from "../Models/Duck";
import { ModelMinnieMouse } from "../Models/MinnieMouse";
import { ModelMan } from "../Models/Man";
import { useMemo, useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import lastMoveToAnimationMap from "@/util/lastMoveToAnimationMap";

export default function MovesNPC({
    landingAnimationMode
}) {

    const toontownMode = useStore(state => state.toontownMode);

    const gameState = useStore(state => state.gameState);
    const roundTimer = useStore(state => state.gameState?.roundTimer)
    const currentRoundMovesSequences = gameState?.movesSequences?.[gameState?.round] || [];

    const [randomMove, setRandomMove] = useState("Up");
    const [randomMoveIndex, setRandomMoveIndex] = useState(1);

    const arrowRef = useRef();
    const pulseTime = useRef(0);

    useEffect(() => {
        if (!landingAnimationMode) return;

        const interval = setInterval(() => {
            const moves = ["Up", "Down", "Left", "Right"];
            const nextMove = moves[Math.floor(Math.random() * moves.length)];
            setRandomMove(nextMove);
            setRandomMoveIndex(prev => prev + 1);
            pulseTime.current = Math.PI; // Force pulse every interval tick
        }, 750);

        return () => clearInterval(interval);
    }, [landingAnimationMode]);

    const currentArrowDisplay = useMemo(() => {

        if (landingAnimationMode) {
            return randomMove;
        }

        if (roundTimer === 10) {
            return currentRoundMovesSequences[0]
        }

    }, [currentRoundMovesSequences, roundTimer, landingAnimationMode, randomMove])

    useEffect(() => {
        if (currentArrowDisplay) {
            pulseTime.current = Math.PI;
        }
    }, [currentArrowDisplay]);

    useFrame((_, delta) => {
        if (pulseTime.current > 0) {
            pulseTime.current -= delta * 12; // Speed of animation
            if (pulseTime.current < 0) pulseTime.current = 0;
            const progress = Math.sin(pulseTime.current);
            const s = 1 + progress * 0.5;
            if (arrowRef.current) {
                arrowRef.current.scale.set(s, s, s);
            }
        } else if (arrowRef.current && arrowRef.current.scale.x !== 1) {
            arrowRef.current.scale.set(1, 1, 1);
        }
    });

    const calculateRotationForMove = (move) => {

        switch (move) {
            case "Up":
                return [Math.PI / 2, Math.PI / 2, 0];
            case "Down":
                return [Math.PI / 2, -Math.PI / 2, 0];
            case "Left":
                return [Math.PI / 2, Math.PI, 0];
            case "Right":
                return [Math.PI / 2, 0, 0];
            default:
                return [Math.PI / 2, Math.PI / 2, 0];
        }
    }

    const currentArrowRotation = useMemo(() => calculateRotationForMove(currentArrowDisplay), [currentArrowDisplay])

    return (
        <group
            rotation={[0, degToRad(45), 0]}
            position={[-20, 0, 5]}
            scale={3}
        >

            {toontownMode ?
                <ModelMinnieMouse
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                />
                :
                <ModelMan
                    position={[2, 0, -1]}
                    rotation={[0, 0, 0]}
                    scale={currentArrowDisplay === 'Right' ? [-1, 1, 1] : [1, 1, 1]}
                    action={lastMoveToAnimationMap[currentArrowDisplay] || "HumanArmature|Man_Idle"}
                    moveIndex={landingAnimationMode ? randomMoveIndex : (roundTimer === 10 ? 1 : 0)}
                />
            }

            <group
                position={[
                    0,
                    toontownMode ?
                        5
                        :
                        6,
                    -1
                ]}
            >
                <group ref={arrowRef}>
                    <FlatArrow
                        rotation={currentArrowRotation}
                        position={[2, 0, 0]}
                        color="blue"
                        size={1}
                    />
                </group>
                {/* <FlatArrow
                    rotation={[Math.PI / 2, Math.PI / 2, 0]}
                    position={[1.5, 0, 0]}
                    color="blue"
                    size={1}
                />
                <FlatArrow
                    rotation={[Math.PI / 2, Math.PI / 2, 0]}
                    position={[3.0, 0, 0]}
                    color="blue"
                    size={1}
                />
                <FlatArrow
                    rotation={[Math.PI / 2, Math.PI / 2, 0]}
                    position={[4.5, 0, 0]}
                    color="blue"
                    size={1}
                /> */}
            </group>

        </group>
    )
}