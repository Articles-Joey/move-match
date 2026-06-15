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

        setGameState({
            ...gameState,
            movesSequences: sequences,
            round: 0,
            totalRounds: totalRounds,
            roundTimer: 10
        });
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
    // const initialGameState = useGameStore(state => state.initialGameState)

    if (server) {
        console.warn("[SinglePlayerHandler] Is multiplayer mode")
        return null;
    }

    useEffect(() => {

        console.warn("[SinglePlayerHandler] Player length check")

        if ((gameState?.players?.length || 0) === 0) {

            console.warn("No players found in game state, adding local player.")

            setGameState({
                players: [{
                    id: 'local',
                    nickname: nickname,
                    scorecard: [],
                }],
                status: 'In Lobby',
            });

        }

    }, [gameState?.players?.length])

    useEffect(() => {

        console.warn("SinglePlayerHandler - Status change detected", gameState?.status)

        if (gameState?.status === "In Progress") {

            generateMoveSequence(gameState, setGameState);

            const interval = setInterval(() => {

                const prev = useGameStore.getState().gameState;
                const currentRoundTimer = prev.roundTimer ?? 10;

                let newGameState = prev

                if (currentRoundTimer <= 1) {

                    newGameState = {
                        ...prev,
                        timer: (prev.timer ?? 0) + 1,
                        roundTimer: 10,
                        round: (prev.round ?? 0) + 1,
                        players: prev.players.map(p => ({
                            ...p,
                            moves: [],
                            moveIndex: 0,
                            lastMove: null,
                            scorecard: [],
                        }))
                    };

                } else {
                    newGameState = {
                        ...prev,
                        timer: (prev.timer ?? 0) + 1,
                        roundTimer: currentRoundTimer - 1,
                    }
                }

                if ((newGameState.round ?? 0) >= 5) {
                    newGameState = {
                        ...newGameState,
                        status: 'Game Over',
                        roundTimer: 0,
                        ...(newGameState.players?.[0].scorecard.every(s => s.success) ?
                            {
                                winner: { 
                                    nickname: newGameState.players?.[0].nickname || "Unknown" 
                                },
                            }
                            :
                            {
                                winner: false
                            }
                        ),
                        // winner: {
                        //     nickname: false,
                        // },
                    };
                    // return
                }

                // return {
                //     ...prev,
                //     timer: (prev.timer ?? 0) + 1,
                //     roundTimer: currentRoundTimer - 1,
                // };

                setGameState(newGameState)

            }, 1000);

            return () => clearInterval(interval);
        }

    }, [gameState?.status])

    const playerMoves = gameState?.players?.map(p => p.moves || []) || [];

    useEffect(() => {

        const gameState = useGameStore.getState().gameState;

        console.log("playerMoves changed", playerMoves)

        let allPlayersDone = false;

        if (gameState?.status === "In Progress") {

            const players = gameState.players || [];

            // const round = gameState.round || 0;
            // const requiredMoves = gameState.movesSequences?.[round] || [];

            allPlayersDone = players.every(p => (p.moves?.length || 0) >= gameState?.movesSequences?.[gameState?.round]?.length);

            if (allPlayersDone) {
                console.log("allPlayersDone")

                setGameState({
                    ...gameState,
                    allPlayersDone: true,
                    roundTimer: 10,
                    nextRoundTimer: 2,
                    round: (gameState.round || 0) + 1,
                    players: players.map(p => ({
                        ...p,
                        moves: [],
                        moveIndex: 0,
                        lastMove: null,
                        scorecard: [
                            ...(p.scorecard || []),
                            {
                                round: gameState.round,
                                success: p.moves?.length === gameState.movesSequences?.[gameState.round]?.length && p.moves?.every((m, i) => (m.move || m) === gameState.movesSequences?.[gameState.round]?.[i]),
                                finishTime: 10 - gameState.roundTimer
                            }
                        ],
                    }))
                })
            }

        }

    }, [playerMoves])

}