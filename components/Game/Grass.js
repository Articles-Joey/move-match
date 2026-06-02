import { useStore } from "@/hooks/useStore";
import { useTexture } from "@react-three/drei";
import { NearestFilter, RepeatWrapping } from "three";

const Grass = () => {
    // 1. Fetch graphics quality from your global store
    const graphicsQuality = useStore(state => state.graphicsQuality);

    // 2. Load textures (Drei's useTexture handles caching and Suspense automatically)
    const [colorMap, normalMap] = useTexture([
        '/textures/Grass/Poliigon_GrassPatchyGround_4585_BaseColor.jpg',
        '/textures/Grass/Poliigon_GrassPatchyGround_4585_Normal.png'
    ]);

    // 3. Define dimensions (Using const since these don't change)
    const baseAmount = 200;
    const width = baseAmount;
    const height = baseAmount;

    // 4. Configure texture repeating and filtering
    // Note the explicit semicolons to prevent JS parsing bugs
    [colorMap, normalMap].forEach((t) => {
        t.magFilter = NearestFilter;
        t.wrapS = RepeatWrapping;
        t.wrapT = RepeatWrapping;
        t.repeat.set(width / 10, height / 10);
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial map={colorMap} normalMap={normalMap} />
        </mesh>
    );
};

export default Grass;