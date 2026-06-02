import { Canvas } from "@react-three/fiber"
import { Sky, useDetectGPU, useTexture, OrbitControls, Stats } from "@react-three/drei";

import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import Tree from "@/components/Models/Tree";
import Duck from "@/components/Models/Duck";

import Sand from './Sand';
// import { Farm } from "@/components/Models/Farm";
import { memo, Suspense, useEffect, useMemo } from "react";
import { useMoveMatchStore } from "@/hooks/useMoveMatchStore";
import { useKeyboard } from "@/hooks/useKeyboard";
import { degToRad } from "three/src/math/MathUtils";
import { useStore } from "@/hooks/useStore";
// import Player from "./Player";
// import { Socket } from "socket.io-client";
import SocketPlayers from "./SocketPlayers";
import { useSocketStore } from "@/hooks/useSocketStore";
import { useAddMove } from "@/hooks/useAddMove";
import FlatArrow from "./FlatArrow";
import MovesNPC from "./MovesNPC";
import ImageRing from "./ImageRing";
import FenceRing from "./FenceRing";
import Grass from "./Grass";
import GrassBlades from "./GrassBlades";

function GameCanvas({
    landingAnimationMode
}) {

    const socket = useSocketStore(state => state.socket);
    const addMove = useAddMove();

    const debug = useStore(state => state.debug);
    const showStats = useStore(state => state.showStats);
    const darkMode = useStore(state => state.darkMode);
    const toontownMode = useStore(state => state.toontownMode);

    const { moves } = useMoveMatchStore()

    const { moveBackward, moveForward, moveRight, moveLeft } = useKeyboard()

    useEffect(() => {

        if (landingAnimationMode) return;

        if (moveBackward || moveForward || moveRight || moveLeft) {
            addMove(
                moveForward && 'Up' || moveBackward && 'Down' || moveRight && 'Right' || moveLeft && 'Left'
            );
        }

    }, [moveBackward, moveForward, moveRight, moveLeft])

    const lastMove = useMemo(() => {

        return moves[moves.length - 1]?.move

    }, [moves])

    return (
        <Canvas camera={{ position: [0, 20, 50], fov: 50 }}>

            {showStats && <>
                <Stats className="stats-overlay" />
            </>}

            <OrbitControls
            // autoRotate={gameState?.status == 'In Lobby'}
            />

            {darkMode ?
                <>
                    <ambientLight intensity={1} />
                    <spotLight intensity={20000} position={[-90, 30, 0]} angle={0.2} penumbra={1} />
                    <Sky
                        sunPosition={[0, -10, 0]}
                    />
                </>
                :
                <>
                    <ambientLight intensity={5} />
                    {/* <spotLight intensity={30000} position={[-50, 100, 50]} angle={5} penumbra={1} /> */}
                    <Sky
                        sunPosition={[0, 10, 0]}
                    />
                </>
            }

            <ImageRing />
            <FenceRing />

            {/* Players */}
            <group scale={3} position={[0, 0, 0]}>

                <Suspense>
                    <SocketPlayers />
                </Suspense>

                {/* <Player
                    position={[8, 0, 2]}
                    rotation={[0, 0, 0]}
                />
                <Player
                    position={[6, 0, 1]}
                    rotation={[0, 0, 0]}
                />
                <Player
                    position={[4, 0, 0]}
                    rotation={[0, 0, 0]}
                />
                <Player
                    position={[2, 0, -1]}
                    rotation={[0, 0, 0]}
                /> */}

                {/* TODO - Move to Player component - Players Control Preview */}
                <group
                    scale={1}
                    position={[-12, 6, -1]}
                    rotation={[Math.PI / 2, 0, 0]}
                >

                    {lastMove == 'Up' &&
                        <group
                            position={[14, 0, 0]}
                        >
                            <FlatArrow
                                // rotation={[0, 0, 0]}
                                rotation={[0, degToRad(180), 0]}
                                // rotation={[0, 0, 0]}
                                color="black"
                                size={1}
                            />
                        </group>
                    }

                    {lastMove == 'Down' &&
                        <group
                            position={[14, 0, 0]}
                        >
                            <FlatArrow
                                // rotation={[0, 0, 0]}
                                rotation={[0, degToRad(0), 0]}
                                // rotation={[0, 0, 0]}
                                color="black"
                                size={1}
                            />
                        </group>
                    }

                    {lastMove == 'Right' &&
                        <group
                            position={[14, 0, 0]}
                        >
                            <FlatArrow
                                // rotation={[0, 0, 0]}
                                rotation={[0, degToRad(90), 0]}
                                // rotation={[0, 0, 0]}
                                color="black"
                                size={1}
                            />
                        </group>
                    }

                    {lastMove == 'Left' &&
                        <group
                            position={[14, 0, 0]}
                        >
                            <FlatArrow
                                // rotation={[0, 0, 0]}
                                rotation={[0, degToRad(-90), 0]}
                                // rotation={[0, 0, 0]}
                                color="black"
                                size={1}
                            />
                        </group>
                    }

                    {/* <FlatArrow
                        rotation={[0, Math.PI / 2, 0]}
                        position={[14.25, 0, 0]}
                        color="black"
                        size={1}
                    />

                    <FlatArrow
                        rotation={[0, Math.PI / 2, 0]}
                        position={[16.1, 0, 0]}
                        color="black"
                        size={1}
                    />

                    <FlatArrow
                        rotation={[0, Math.PI / 2, 0]}
                        position={[18.2, 0, 0]}
                        color="black"
                        size={1}
                    /> */}

                </group>

                {/* NPC */}
                <MovesNPC />

                {/* <Duck
                    position={[10, 0, 10]}
                    rotation={[0, -Math.PI, 0]}
                /> */}

                {/* <Duck
                    position={[-10, 0, 10]}
                    rotation={[0, -Math.PI, 0]}
                /> */}
            </group>

            {/* <group>
                <Farm
                    scale={0.1}
                    position={[-60, 0, 105]}
                />
                <Farm
                    scale={0.1}
                    position={[-30, 0, 115]}
                />
                <Farm
                    scale={0.1}
                    position={[0, 0, 120]}
                />
                <Farm
                    scale={0.1}
                    position={[30, 0, 115]}
                />
                <Farm
                    scale={0.1}
                    position={[60, 0, 105]}
                />
            </group>

            <group>
                <Farm
                    scale={0.1}
                    position={[0, 0, -120]}
                    rotation={[0, -Math.PI, 0]}
                />
                <Farm
                    scale={0.1}
                    position={[30, 0, -115]}
                    rotation={[0, -Math.PI, 0]}
                />
                <Farm
                    scale={0.1}
                    position={[-30, 0, -115]}
                    rotation={[0, -Math.PI, 0]}
                />
            </group> */}

            {/* {[...Array(60)].map((item, i) => {
                return (
                    <>
                        <Tree
                            key={i}
                            scale={0.2}
                            position={[-90, 0, (-84 + i * 3)]}
                        />
                    </>
                )
            })}

            {[...Array(60)].map((item, i) => {
                return (
                    <>
                        <Tree
                            key={i}
                            scale={0.2}
                            position={[90, 0, (-84 + i * 3)]}
                        />
                    </>
                )
            })} */}

            <Grass />
            <GrassBlades />

            <Sand
                args={[200, 200]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
            />

            {/* <pointLight position={[-10, -10, -10]} /> */}

        </Canvas>
    )
}

export default memo(GameCanvas)