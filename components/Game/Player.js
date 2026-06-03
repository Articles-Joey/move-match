import { memo } from "react";

import { useMoveMatchStore } from "@/hooks/useMoveMatchStore";
import { ModelMan } from "../Models/Man";
import { useStore } from "@/hooks/useStore";

const DEFAULT_SCALE = [1, 1, 1];
const FLIPPED_SCALE = [-1, 1, 1];

const lastMoveToAnimationMap = {
    'Up': "HumanArmature|Man_Jump",
    'Down': "HumanArmature|Man_Sitting",
    'Left': "HumanArmature|Man_Punch",
    'Right': "HumanArmature|Man_Punch",
}

const Player = memo(function Player({ player }) {

    const characterCustomization = useStore((state) => state.characterCustomization)

    const playerId = player?.id;
    const derivedMoveIndex = useMoveMatchStore(state => {
        if (!playerId) return 0;

        for (let index = state.moves.length - 1; index >= 0; index -= 1) {
            if (state.moves[index]?.player_id === playerId) {
                return index + 1;
            }
        }

        return 0;
    });

    const scale = player?.lastMove === 'Right' ? FLIPPED_SCALE : DEFAULT_SCALE;

    function calculatedCharacterSettings() {
        if (!player) return null;

        if (playerId == "local") {
            return characterCustomization;
        }
    }

    return (
        <group>
            <ModelMan
                position={[2, 0, -1]}
                rotation={[0, 0, 0]}
                scale={scale}
                action={lastMoveToAnimationMap[player?.lastMove] || "HumanArmature|Man_Idle"}
                moveIndex={player?.moveIndex ?? derivedMoveIndex}
                forceCharacterSettings={
                    calculatedCharacterSettings()
                }
            />
        </group>
    )
})

export default Player;