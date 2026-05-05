import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap"

import IsDev from "@/components/UI/IsDev";
import ArticlesButton from "./Button";
import Link from "next/link";
import { useGameStore } from "@/hooks/useGameStore";

export default function GameOverModal({
    // show,
    // setShow,
}) {

    const status = useGameStore(state => state.gameState.status);

    useEffect(() => {
        if (status === 'Game Over') {
            setShowModal(true)
        }
    }, [status])

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Modal
                className="articles-modal games-over-modal"
                size='md'
                show={showModal}
                centered
                scrollable
                onExited={() => {
                    setShowModal(false)
                }}
                onHide={() => {
                    setShowModal(false)
                }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Game Over</Modal.Title>
                </Modal.Header>

                <Modal.Body className="flex-column p-0">

                    <div className="p-3">

                        <div className="mb-3">The winner was <b>{showModal?.winner?.nickname || "Unknown"}</b>!</div>

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

                    <ArticlesButton variant="outline-dark" onClick={() => {
                        setShowModal(false)
                    }}>
                        Play Again
                    </ArticlesButton>

                </Modal.Footer>

            </Modal>
        </>
    )

}