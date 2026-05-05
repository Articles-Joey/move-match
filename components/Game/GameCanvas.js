import { Canvas } from "@react-three/fiber"
import { Sky, useDetectGPU, useTexture, OrbitControls, Stats } from "@react-three/drei";

import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import Tree from "@/components/Models/Tree";
import Duck from "@/components/Models/Duck";

const texture = new TextureLoader().load(`${process.env.NEXT_PUBLIC_CDN}games/Race Game/grass.jpg`)

const GrassPlane = () => {

    const width = 110; // Set the width of the plane
    const height = 110; // Set the height of the plane

    texture.magFilter = NearestFilter;
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(5, 5)

    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                <circleGeometry attach="geometry" args={[width, height]} />
                <meshStandardMaterial attach="material" map={texture} />
            </mesh>
        </>
    );
};

import Sand from './Sand';
import { Farm } from "@/components/Models/Farm";
import { memo, useEffect, useMemo } from "react";
import { useMoveMatchStore } from "@/hooks/useMoveMatchStore";
import { useKeyboard } from "@/hooks/useKeyboard";
import { degToRad } from "three/src/math/MathUtils";
import { useStore } from "@/hooks/useStore";

const FlatArrow = (props) => {

    return (
        <group
            {...props}
        >

            {/* Shaft */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                <planeGeometry attach="geometry" args={[0.4, 1]} />
                <meshStandardMaterial attach="material" color={props.color} transparent={true} opacity={0.5} />
            </mesh>

            {/* Head */}
            {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 2]}>
                <planeGeometry attach="geometry" args={[1, 0.5]} />
                <meshStandardMaterial attach="material" color={'purple'} />
            </mesh> */}

            {/* Left Blockout */}
            <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 4]} position={[-0.212, 0.1, 0.2]}>
                <planeGeometry attach="geometry" args={[1, 0.4]} />
                <meshStandardMaterial attach="material" color={props.color} />
            </mesh>

            {/* Right Blockout */}
            <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[0.212, 0.1, 0.2]}>
                <planeGeometry attach="geometry" args={[1, 0.4]} />
                <meshStandardMaterial attach="material" color={props.color} />
            </mesh>

            {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 1.5]}>

                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attachObject={["attributes", "position"]}
                        args={[f32array, 3]}
                    />
                </bufferGeometry>

                <meshBasicMaterial
                    attach="material"
                    color="#5243aa"
                    // wireframe={false}
                    side={DoubleSide}
                />

            </mesh> */}

        </group>
    );
};

function GameCanvas(props) {

    const debug = useStore(state => state.debug);
    const showStats = useStore(state => state.showStats);
    const darkMode = useStore(state => state.darkMode);
    const toontownMode = useStore(state => state.toontownMode);

    const {
        moves,
        setMoves,
        addMove
    } = useMoveMatchStore()

    const { moveBackward, moveForward, moveRight, moveLeft } = useKeyboard()

    useEffect(() => {

        if (
            moveBackward
            ||
            moveForward
            ||
            moveRight
            ||
            moveLeft
        ) {

            setMoves([
                ...moves,
                ...(moveBackward ? ["Down"] : []),
                ...(moveForward ? ["Up"] : []),
                ...(moveRight ? ["Right"] : []),
                ...(moveLeft ? ["Left"] : []),
            ]);

            console.log("Move detected", moves)

        }

    }, [moveBackward, moveForward, moveRight, moveLeft])

    const lastMove = useMemo(() => {

        return moves[moves.length - 1]

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

            {/* Players */}
            <group scale={3} position={[0, 0, 0]}>

                <Duck
                    position={[8, 0, 0]}
                    rotation={[0, 0, 0]}
                />
                <Duck
                    position={[6, 0, 0]}
                    rotation={[0, 0, 0]}
                />
                <Duck
                    position={[4, 0, 0]}
                    rotation={[0, 0, 0]}
                />
                <Duck
                    position={[2, 0, 0]}
                    rotation={[0, 0, 0]}
                />

                <group
                    scale={1}
                    position={[-12, 2.5, 0]}
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
                <group
                    rotation={[0, degToRad(45), 0]}
                    position={[-5, 0, 0]}
                >
                    <Duck
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                    />
                    <group
                        position={[-2.5, 2.5, 0]}
                    >
                        <FlatArrow
                            rotation={[Math.PI / 2, Math.PI / 2, 0]}
                            color="blue"
                            size={1}
                        />
                        <FlatArrow
                            rotation={[Math.PI / 2, Math.PI / 2, 0]}
                            position={[1.5, 0, 0]}
                            color="blue"
                            size={1}
                        />
                        <FlatArrow
                            rotation={[Math.PI / 2, Math.PI / 2, 0]}
                            position={[3.0, 0, 0]}
                            color="blue"
                            size={1}
                        />
                        <FlatArrow
                            rotation={[Math.PI / 2, Math.PI / 2, 0]}
                            position={[4.5, 0, 0]}
                            color="blue"
                            size={1}
                        />
                    </group>
                </group>

                {/* <Duck
                    position={[10, 0, 10]}
                    rotation={[0, -Math.PI, 0]}
                /> */}

                {/* <Duck
                    position={[-10, 0, 10]}
                    rotation={[0, -Math.PI, 0]}
                /> */}
            </group>

            <group>
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
            </group>

            {[...Array(60)].map((item, i) => {
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
            })}

            <GrassPlane />

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