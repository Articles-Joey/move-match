/* RotatingMascot.tsx */
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

import { ModelMan } from "../Models/Man";
import { useStore } from "@/hooks/useStore";

/* --------------------------------------------------------------------- */
/* Helper component that captures the canvas once it has been rendered.  */
function CaptureImage({ onCapture }) {
  const { gl } = useThree();          // three.js renderer
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (captured) return;             // capture only once

    /* We want the image after the frame has actually been drawn.
       requestAnimationFrame guarantees that. */
    requestAnimationFrame(() => {
      const dataUrl = gl.domElement.toDataURL("image/png");
      onCapture(dataUrl);
      setCaptured(true);              // avoid re‑capturing
    });
  }, [gl, captured, onCapture]);

  return null;   // nothing to render
}
/* --------------------------------------------------------------------- */

export default function RotatingMascot({ forceCharacterSettings }) {
  /* Zustand state --------------------------------------------------- */
  const characterCustomization = useStore((state) => state.characterCustomization);
  const setCharacterImagePreview = useStore((state) => state.setCharacterImagePreview);

  /* Trigger a new capture whenever the settings change.            */
  const [captureTrigger, setCaptureTrigger] = useState(0);
  useEffect(() => {
    // Whenever we re‑render with new props/state we want a fresh preview
    setCaptureTrigger((t) => t + 1);
  }, [forceCharacterSettings, characterCustomization]);

  /* Render ----------------------------------------------------------- */
  return (
    <div className="rotating-mascot-container w-100 h-100">
      <Suspense fallback={null}>
        <Canvas>
          {/* OrbitControls – we only want the auto‑rotate effect */}
          <OrbitControls
            autoRotate
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotateSpeed={10}
          />

          <ambientLight intensity={4} />

          <Suspense fallback={null}>
            <group position={[0, -3, 0]}>
              <ModelMan
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                fakeMovements={true}
                forceCharacterSettings={
                  forceCharacterSettings ? characterCustomization : null
                }
              />
            </group>
          </Suspense>

          {/* The CaptureImage component is remounted each time
              `captureTrigger` changes – that forces a fresh screenshot. */}
          <CaptureImage onCapture={(url) => setCharacterImagePreview(url)} key={captureTrigger} />
        </Canvas>
      </Suspense>
    </div>
  );
}
