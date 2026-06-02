// Attempting a socket server first architecture, but this component will handle the single player mode and local game state management.

import { useEffect } from "react"
import { useStore } from "@/hooks/useStore"
import { useSocketStore } from "@/hooks/useSocketStore"
import { useSearchParams } from "next/navigation";
import { useGameStore } from "@/hooks/useGameStore";

const totalRounds = 5;

function generateMoveSequence(gameState, setGameState) {

    let activeMode = "Pattern"; // 'Random' or 'Pattern'

    // Initial game setup when moving to In Progress
    if (gameState.movesSequences === undefined) {
        const moveOptions = ['Up', 'Down', 'Left', 'Right'];
        const sequences = [];

        if (activeMode === 'Random') {
            for (let r = 0; r < totalRounds; r++) {
                const roundMoves = [];
                for (let m = 0; m < r + 1; m++) {
                    roundMoves.push(moveOptions[Math.floor(Math.random() * moveOptions.length)]);
                }
                sequences.push(roundMoves);
            }
        } else if (activeMode === 'Pattern') {
            for (let r = 0; r < totalRounds; r++) {
                const roundMoves = r === 0 ? [] : [...sequences[r - 1]];
                roundMoves.push(moveOptions[Math.floor(Math.random() * moveOptions.length)]);
                sequences.push(roundMoves);
            }
        }

        setGameState(prev => ({
            ...prev,
            movesSequences: sequences,
            round: 0,
            totalRounds: totalRounds,
            roundTimer: 10
        }));
    }

}

export default function SinglePlayerHandler() {

    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries());
    const { server } = params

    const socket = useSocketStore(state => state.socket)

    const nickname = useStore((state) => state.nickname)

    const gameState = useGameStore(state => state.gameState)
    const setGameState = useGameStore(state => state.setGameState)

    if (server) {
        console.warn("[SinglePlayerHandler] Is multiplayer mode")
        return null;
    }

    useEffect(() => {

        if (!server) {
            // TODO
            // setGameState(initialGameState);
        }

    }, [])

    useEffect(() => {

        console.warn("[SinglePlayerHandler] Player length check")

        if ((gameState?.players?.length || 0) === 0) {

            console.warn("No players found in game state, adding local player.")

            setGameState({
                players: [{ id: 'local', nickname: nickname }],
                status: 'In Lobby',
            });

        }

    }, [gameState?.players?.length])

    useEffect(() => {

        console.warn("SinglePlayerHandler - Status change detected", gameState?.status)

        if (gameState?.status === "In Progress") {

            generateMoveSequence(gameState, setGameState);

            const interval = setInterval(() => {
                setGameState((prev) => {

                    const currentRoundTimer = prev.roundTimer ?? 10;

                    if (currentRoundTimer <= 1) {
                        const nextRound = (prev.round ?? 0) + 1;

                        if (nextRound > 4) {
                            return {
                                ...prev,
                                status: 'Game Over',
                                roundTimer: 0
                            };
                        }

                        return {
                            ...prev,
                            timer: (prev.timer ?? 0) + 1,
                            roundTimer: 10,
                            round: nextRound,
                        };
                    }

                    return {
                        ...prev,
                        timer: (prev.timer ?? 0) + 1,
                        roundTimer: currentRoundTimer - 1,
                    };

                });
            }, 1000);

            return () => clearInterval(interval);
        }

    }, [gameState?.status])

}