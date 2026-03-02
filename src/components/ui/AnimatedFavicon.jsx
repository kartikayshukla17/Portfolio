import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A single orbiting ring particle system
const OrbitRing = ({ radius, speed, count, color, tilt = 0 }) => {
    const ref = useRef();
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            pos[i * 3 + 0] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = Math.sin(angle) * radius * Math.sin(tilt);
            pos[i * 3 + 2] = Math.sin(angle) * radius * Math.cos(tilt);
        }
        return pos;
    }, [radius, count, tilt]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * speed;
            ref.current.rotation.x = state.clock.getElapsedTime() * speed * 0.3;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color={color} size={0.04} transparent opacity={0.8} sizeAttenuation />
        </points>
    );
};

// The core wireframe polyhedron
const PolyhedronCore = () => {
    const outerRef = useRef();
    const innerRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (outerRef.current) {
            outerRef.current.rotation.x = t * 0.15;
            outerRef.current.rotation.y = t * 0.22;
        }
        if (innerRef.current) {
            innerRef.current.rotation.x = -t * 0.1;
            innerRef.current.rotation.y = -t * 0.18;
        }
    });

    return (
        <group>
            {/* Outer wireframe icosahedron — violet */}
            <mesh ref={outerRef}>
                <icosahedronGeometry args={[1.8, 1]} />
                <meshBasicMaterial color="#a277ff" wireframe />
            </mesh>
            {/* Inner counter-rotating wireframe — amber, reads on any bg */}
            <mesh ref={innerRef}>
                <icosahedronGeometry args={[1.1, 0]} />
                <meshBasicMaterial color="#f59e0b" wireframe />
            </mesh>
        </group>
    );
};

export const AnimatedFavicon = () => {
    return (
        <group>
            <PolyhedronCore />
            {/* Three orbit rings at different tilts & speeds */}
            <OrbitRing radius={2.8} speed={0.4} count={120} color="#a277ff" tilt={0} />
            <OrbitRing radius={3.4} speed={-0.3} count={90} color="#f59e0b" tilt={Math.PI / 3} />
            <OrbitRing radius={2.2} speed={0.6} count={80} color="#ffca85" tilt={Math.PI / 1.5} />
        </group>
    );
};

export default AnimatedFavicon;

