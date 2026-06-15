import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap"

import IsDev from "@/components/UI/IsDev";
import ArticlesButton from "./Button";
import Link from "next/link";
import { useGameStore } from "@/hooks/useGameStore";
import useGameHelpers from "@/hooks/useGameHelpers";
import { useRouter } from "next/navigation";

export default function GameOverModal({
    // show,
    // setShow,
}) {

    const router = useRouter();

    const gameState = useGameStore(state => state.gameState);
    const status = useGameStore(state => state.gameState.status);

    function setShowModal() {
        // console.log("setShowModal called")
        // router.push("/")
    }

    // useEffect(() => {
    //     if (status === 'Game Over') {
    //         setShowModal(true)
    //     }
    // }, [status])

    // const [showModal, setShowModal] = useState(false)

    const {
        startGame
    } = useGameHelpers();

    return (
        <>
            <Modal
                className="articles-modal games-over-modal"
                size='md'
                show={status === "Game Over"}
                centered
                scrollable
                onExited={() => {
                    setShowModal(false)
                }}
                onHide={() => {
                    setShowModal(false)
                }}
            >

                <Modal.Header closeButton={false}>
                    <Modal.Title>Game Over</Modal.Title>
                </Modal.Header>

                <Modal.Body className="flex-column p-0">

                    <div className="p-3">

                        {gameState?.winner === false ? (
                            <div className="mb-3">No one won this time! Incorrect patterns made.</div>
                        ) : (
                            <div className="mb-3">The winner was <b>{gameState?.winner?.nickname || "Unknown"}</b>!</div>
                        )}

                        <div>Total Moves Time: {gameState?.players?.[0]?.scorecard?.reduce((acc, curr) => acc + (curr.finishTime || 0), 0) || 0} seconds</div>

                        {/* <div className="mb-3">The winner was <b>{gameState?.winner?.nickname || "Unknown"}</b>!</div> */}

                        {/* <div className="mb-2">Here is how everyone else did:</div>

                        {show?.rankings?.map((player, index) => (
                            <div key={index}>
                                <b>{player.nickname || "Unknown"}</b>: {player.distance?.toFixed(2) || 0} meters
                            </div>
                        ))} */}

                    </div>

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <Link href="/">
                        <ArticlesButton variant="outline-dark" onClick={() => {
                            setShowModal(false)
                        }}>
                            Close
                        </ArticlesButton>
                    </Link>

                    <ArticlesButton
                        variant="outline-dark"
                        onClick={() => {
                            startGame("In Lobby")
                        }}
                    >
                        Play Again
                    </ArticlesButton>

                </Modal.Footer>

            </Modal>
        </>
    )

}