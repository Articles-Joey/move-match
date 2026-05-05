import { useGameStore } from "@/hooks/useGameStore"
import { useSearchParams } from "next/navigation"
import { useShallow } from "zustand/react/shallow"

import Player from "./Player";

export default function SocketPlayers() {

    const playerIds = useGameStore(useShallow(state => state.gameState.players?.map(p => p.id)))

    return (
        <group>
            {playerIds?.map((id, index) => (
                <group key={id ?? index} position={[0, 0, 0]}>
                    <PlayerById id={id} />
                </group>
            ))}
        </group>
    )
}

function PlayerById({ id }) {
    const player = useGameStore(state => state.gameState.players?.find(p => p.id === id))
    return <Player player={player} />
}