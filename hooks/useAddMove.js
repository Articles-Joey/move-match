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

    return (direction) => {

        const moves = useMoveMatchStore.getState().moves;
        const nextMoveIndex = moves.length + 1;

        setMoves([
            ...moves,
            {
                move: direction,
                player_id: server ? socket?.id : 'local'
            }
        ]);

        if (!server) {

            const gameState = useGameStore.getState().gameState;

            setGameState(prev => ({
                ...gameState,
                players: gameState.players.map(
                    p => p.id === (server ? socket?.id : 'local')
                        ?
                        {
                            ...p,
                            lastMove:
                                direction,
                            moveIndex: nextMoveIndex
                        }
                        :
                        p
                )
            }))
        }

        console.log("Move detected", direction);
    };
}