import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
// import FinishLine from "../Models/FinishLine";
import { ModelMan } from "../Models/Man";

export default function RotatingMascot({ forceCharacterSettings }) {
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
                        >

                            <ModelMan
                                position={[0, 0, 0]}
                                rotation={[0, 0, 0]}
                                fakeMovements={true}
                                forceCharacterSettings={forceCharacterSettings}
                            />

                        </group>
                    </Suspense>

                </Canvas>
            </Suspense>
        </div>
    );
}