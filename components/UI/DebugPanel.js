import { useStore } from "@/hooks/useStore";
import ArticlesButton from "./Button";
import { useSocketStore } from "@/hooks/useSocketStore";
import { useSearchParams } from "next/navigation";
import { useMoveMatchStore } from "@/hooks/useMoveMatchStore";
import { useGameStore } from "@/hooks/useGameStore";
import { useMemo } from "react";
import { useAddMove } from "@/hooks/useAddMove";

export default function DebugPanel() {

    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries());
    const { server } = params

    const gameState = useGameStore(state => state.gameState)

    const socket = useSocketStore(state => state.socket)

    const reloadScene = useStore((state) => state.reloadScene)

    // const {
    //     moves
    // } = useMoveMatchStore()

    const addMove = useAddMove();

    const moves = useMemo(() => {

        return gameState?.players?.find(p => p.id === (server ? socket?.id : 'local'))?.moves || [];

    }, [gameState])

    return (
        <div
            className="card card-articles card-sm"
        >
            <div className="card-body">

                <div className="small text-muted mb-2">Debug Controls</div>

                <div className="border p-3 mb-3">

                    <div className="small">Current Pattern</div>

                    {gameState.movesSequences && gameState.movesSequences[gameState.round] ? (
                        <div className="d-flex align-items-center gap-2">
                            {gameState.movesSequences[gameState.round].map((move, index) => (
                                <div key={index} className="badge bg-secondary">{move}</div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted">No pattern yet</div>
                    )}

                </div>

                <div
                    className="border p-3"
                    style={{
                        maxHeight: 300,
                        overflowY: 'auto'
                    }}
                >
                    {moves.length === 0 && <div className="text-muted">No moves yet</div>}
                    {[...moves]
                        .reverse()
                        .map((item, index) => {
                            return (
                                <div key={item.move + index} className="d-flex align-items-center gap-2">

                                    <div className="badge bg-secondary">{item.move}</div>

                                    <div className="text-muted">{item.player_id}</div>

                                </div>
                            )
                        })}
                </div>

                <div className="border p-3 d-flex justify-content-center mb-2">
                    {['up', 'down', 'left', 'right'].map((item) => {
                        return (
                            <ArticlesButton
                                key={item}
                                onClick={() => {

                                    addMove(item);

                                    // if (server) {

                                    //    addMove(item);

                                    // } else {

                                    //     addMove(item);

                                    // }

                                }}
                            >
                                <i className={`fad fa-arrow-${item} me-0`}></i>
                            </ArticlesButton>
                        )
                    })}
                </div>

                <div className='d-flex flex-column'>

                    <div
                        style={{
                            fontSize: '0.5rem!important',
                        }}
                    >

                        <ArticlesButton
                            size="sm"
                            className="w-50"
                            onClick={() => reloadScene()}
                        >
                            <i className="fad fa-redo"></i>
                            Reload Game
                        </ArticlesButton>

                        <ArticlesButton
                            size="sm"
                            className="w-50"
                            onClick={() => reloadScene()}
                        >
                            <i className="fad fa-redo"></i>
                            Reset Camera
                        </ArticlesButton>

                        <ArticlesButton
                            size="sm"
                            className="w-50"
                            onClick={() => {
                                console.log(useGameStore.getState().gameState)
                            }}
                        >
                            <i className="fad fa-redo"></i>
                            Log Game
                        </ArticlesButton>

                    </div>

                </div>

            </div>
        </div>
    )
}