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

export default FlatArrow;