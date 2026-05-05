import { useGameStore } from "@/hooks/useGameStore"
import TouchControls from "./TouchControls"
import useTouchControlsStore from "@/hooks/useTouchControlsStore"

export default function UiOverlay() {

    const score = useGameStore((state) => state.score)
    const timer = useGameStore((state) => state.gameState.timer)
    const round = useGameStore(state => state.gameState.round)
    const roundTimer = useGameStore(state => state.gameState.roundTimer)

    const touchControlsEnabled = useTouchControlsStore(state => state.enabled)

    return (
        <>
            <div className='game-ui-overlay'>

                <div className='score'>
                    Timer: {timer || 0} - Score: {score || 0}
                </div>

                <div className='score'>
                    -
                </div>

                <div className='score'>
                    Round: {round || 0} - Round Time: {roundTimer || 0}
                </div>

            </div>
            {touchControlsEnabled &&
                <TouchControls />
            }
        </>
    )
}