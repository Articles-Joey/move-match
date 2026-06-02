import { degToRad } from "three/src/math/MathUtils.js";
import FlatArrow from "./FlatArrow";

import { useStore } from "@/hooks/useStore";

import Duck from "../Models/Duck";
import { ModelMinnieMouse } from "../Models/MinnieMouse";
import { ModelMan } from "../Models/Man";
import { useMemo } from "react";

export default function MovesNPC({ }) {

    const toontownMode = useStore(state => state.toontownMode);

    const gameState = useStore(state => state.gameState);
    const roundTimer = useStore(state => state.gameState?.roundTimer)
    const currentRoundMovesSequences = gameState?.movesSequences?.[gameState?.round] || [];

    const currentArrowDisplay = useMemo(() => {

        if (roundTimer === 10) {
            return currentRoundMovesSequences[0]
        }        

    }, [currentRoundMovesSequences, roundTimer])

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
                    scale={1}
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
                <FlatArrow
                    rotation={currentArrowRotation}
                    position={[2, 0, 0]}
                    color="blue"
                    size={1}
                />
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