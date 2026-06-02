import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useMemo } from "react";
// import FinishLine from "../Models/FinishLine";
import { Farm } from "../Models/Farm";
import { ModelMan } from "../Models/Man";

const lastMoveToAnimationMap = {
    'Up': "HumanArmature|Man_Jump",
    'Down': "HumanArmature|Man_Sitting",
    'Left': "HumanArmature|Man_Punch",
    'Right': "HumanArmature|Man_Punch",
};

const MOVES = ['Up', 'Down', 'Left', 'Right'];
const BASE_SCALE = 1.25;

export default function RotatingMascot() {
    const [animationState, setAnimationState] = useState({
        move: null,
        moveIndex: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMove = MOVES[Math.floor(Math.random() * MOVES.length)];
            setAnimationState(prev => ({
                move: randomMove,
                moveIndex: prev.moveIndex + 1
            }));
        }, 750 + Math.random() * 0); // Random interval between 0.5-1.5 seconds

        return () => clearInterval(interval);
    }, []);

    const scale = useMemo(() => {
        const s = animationState.move === 'Right' ? -BASE_SCALE : BASE_SCALE;
        return [s, BASE_SCALE, BASE_SCALE];
    }, [animationState.move]);

    return (
        <div className="rotating-mascot-container w-100 h-100">
            <Suspense>
                <Canvas>

                    <OrbitControls
                        autoRotate
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                        autoRotateSpeed={10}
                    />

                    <ambientLight intensity={4} />

                    <Suspense fallback={null}>
                        <group
                            position={[0, -3, 0]}
                        // scale={0.025}
                        >

                            {/* <Farm /> */}

                            <ModelMan
                                position={[0, 0, 0]}
                                rotation={[0, 0, 0]}
                                scale={scale}
                                action={lastMoveToAnimationMap[animationState.move] || "HumanArmature|Man_Idle"}
                                moveIndex={animationState.moveIndex}
                            />

                        </group>
                    </Suspense>

                </Canvas>
            </Suspense>
        </div>
    );
}