import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap"

// import IsDev from "@/components/UI/IsDev";
import ArticlesButton from "./Button";
// import Link from "next/link";
// import { useGameStore } from "@/hooks/useGameStore";
import { useStore } from "@/hooks/useStore";
import RotatingMascot from "./RotatingMascot";
import { SKIN_TONES } from "../Models/Man";
import { ChromePicker, TwitterPicker } from 'react-color';

export default function CharacterCustomizationModal({
    // show,
    // setShow,
}) {

    const showModal = useStore((state) => state.characterCustomizationModal)
    const setShowModal = useStore((state) => state.setCharacterCustomizationModal)

    const characterCustomization = useStore((state) => state.characterCustomization)
    const resetCharacterCustomization = useStore((state) => state.resetCharacterCustomization)

    const [editingItem, setEditingItem] = useState(null)

    // const [showModal, setShowModal] = useState(false)

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
                    setEditingItem(null)
                }}
                onHide={() => {
                    setShowModal(false)
                    setEditingItem(null)
                }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Customize Character</Modal.Title>
                </Modal.Header>

                <Modal.Body className="flex-column p-0">

                    <div className="d-flex">

                        <div className="w-50 border">
                            <RotatingMascot
                                forceCharacterSettings={true}
                            />
                        </div>

                        <div 
                            className="w-50 p-2"
                            style={{
                                maxHeight: "400px",
                                overflowY: "auto",
                            }}
                        >

                            {[
                                "Skin",
                                "Hair",
                                "Shirt",
                                "Shorts",
                                "Shoes",
                            ].map((item, index) => {

                                const isSkin = item.toLowerCase() === "skin"

                                return (
                                    <div
                                        key={index}
                                        className="d-flex align-items-center mb-3"
                                    >
                                        <div className="me-2">

                                            <div className="h6 mb-0">
                                                {item} {characterCustomization[item.toLowerCase()]}
                                            </div>

                                            <div className="w-100">

                                                {isSkin ?
                                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                                        {SKIN_TONES.map((value) => {
                                                            return (
                                                                <div
                                                                    key={value}
                                                                    // variant="outline-dark"
                                                                    style={{
                                                                        backgroundColor: value,
                                                                        borderColor: value,
                                                                        color: "transparent",
                                                                        width: "32px",
                                                                        height: "32px",
                                                                        borderRadius: "50%",
                                                                        cursor: "pointer",
                                                                        border: characterCustomization.skin === value ? '2px solid black' : '1px solid #ccc'
                                                                    }} onClick={() => {
                                                                        useStore.setState((state) => ({
                                                                            characterCustomization: {
                                                                                ...state.characterCustomization,
                                                                                skin: value,
                                                                            }
                                                                        }))
                                                                    }}
                                                                />
                                                            )
                                                        })}
                                                    </div>
                                                    :
                                                    <div style={{ position: 'relative' }}>

                                                        <ArticlesButton
                                                            onClick={() => setEditingItem(editingItem === item ? null : item)}
                                                        >
                                                            {editingItem === item ? 'Close' : 'Edit'}
                                                        </ArticlesButton>

                                                        {editingItem === item && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                zIndex: '2',
                                                                top: '100%',
                                                                left: 0,
                                                                marginTop: '10px',
                                                                width: '100px',
                                                            }}>
                                                                <ChromePicker
                                                                    // triangle="top-left"
                                                                    disableAlpha={true}
                                                                    disableSwatches={true}
                                                                    disableHex={true}
                                                                    color={characterCustomization[item.toLowerCase()]}
                                                                    onChangeComplete={(color) => {
                                                                        useStore.setState((state) => ({
                                                                            characterCustomization: {
                                                                                ...state.characterCustomization,
                                                                                [item.toLowerCase()]: color.hex,
                                                                            }
                                                                        }))
                                                                    }}
                                                                />
                                                            </div>
                                                        )}

                                                    </div>
                                                }

                                            </div>

                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <div>
                        <ArticlesButton variant="outline-dark" onClick={() => {
                            setShowModal(false)
                        }}>
                            Close
                        </ArticlesButton>
                        <ArticlesButton variant="outline-dark" onClick={() => {
                            resetCharacterCustomization()
                        }}>
                            <i className="fad fa-redo"></i>
                        </ArticlesButton>
                    </div>

                    {/* Saves right away but will just leave this here */}
                    <ArticlesButton variant="success" onClick={() => {
                        setShowModal(false)
                    }}>
                        Save
                    </ArticlesButton>

                </Modal.Footer>

            </Modal>
        </>
    )

}