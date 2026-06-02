import { useSearchParams } from "next/navigation";
import { useMoveMatchStore } from "./useMoveMatchStore";
import { useSocketStore } from "./useSocketStore";
import { useGameStore } from "./useGameStore";

export function useAddMove() {

    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries());
    const { server } = params

    const socket = useSocketStore(state => state.socket);
    const setMoves = useMoveMatchStore(state => state.setMoves);

    const setGameState = useGameStore(state => state.setGameState);

    const usersPreviousMoves = useGameStore(state => state.gameState?.players?.find(p => p.id === (server ? socket?.id : 'local'))?.moves || []);

    return (direction) => {

        // const moves = useMoveMatchStore.getState().moves;

        const nextMoveIndex = usersPreviousMoves.length + 1;

        const newMoves = [
            ...usersPreviousMoves,
            {
                move: direction,
                player_id: server ? socket?.id : 'local'
            }
        ]

        // setMoves(newMoves);

        if (!server) {

            const gameState = useGameStore.getState().gameState;

            setGameState({
                ...gameState,
                players: gameState.players.map(
                    p => p.id === (server ? socket?.id : 'local')
                        ?
                        {
                            ...p,
                            moves: newMoves,
                            lastMove:
                                direction,
                            moveIndex: nextMoveIndex
                        }
                        :
                        p
                )
            })
        }

        console.log("Move detected", direction);
    };
}