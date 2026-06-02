import { degToRad } from "three/src/math/MathUtils.js";
import FlatArrow from "./FlatArrow";

import { useStore } from "@/hooks/useStore";

import Duck from "../Models/Duck";
import { ModelMinnieMouse } from "../Models/MinnieMouse";
import { ModelMan } from "../Models/Man";

export default function MovesNPC({ }) {

    const toontownMode = useStore(state => state.toontownMode);

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
                // <Duck
                //     position={[0, 0, 0]}
                //     rotation={[0, 0, 0]}
                // />
                <ModelMan
                    position={[2, 0, -1]}
                    rotation={[0, 0, 0]}
                    scale={1}
                    // action={lastMoveToAnimationMap[player?.lastMove] || "HumanArmature|Man_Idle"}
                    // moveIndex={player?.moveIndex ?? derivedMoveIndex}
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
                    rotation={[Math.PI / 2, Math.PI / 2, 0]}
                    color="blue"
                    size={1}
                />
                <FlatArrow
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
                />
            </group>

        </group>
    )
}