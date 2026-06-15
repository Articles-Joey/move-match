import { useSearchParams } from "next/navigation";
import { useGameStore } from "./useGameStore";
import { useSocketStore } from "./useSocketStore";

export default function useGameHelpers() {

    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries());
    const { server } = params

    const gameState = useGameStore(state => state.gameState);
    const setGameState = useGameStore(state => state.setGameState);

    const startServerGame = useSocketStore(state => state.startGame)

    // const player = useGameStore(state => state.player);
    // const players = useGameStore(state => state.players);

    function startGame(status = "In Progress") {
        console.log("Starting game...")

        if (server) {
            startServerGame(server, "In Progress")
        } else {
            // Event handled with SinglePlayerHandler
            setGameState({
                ...useGameStore.getState().gameState,
                status: status,
                timer: 0,
                round: 0,
                roundTimer: 0,
                players: useGameStore.getState().gameState.players.map(p => ({
                    ...p,
                    moves: [],
                    moveIndex: 0,
                    lastMove: null,
                    scorecard: [],
                }))
            })
        }

    }

    return {
        startGame
    }

}