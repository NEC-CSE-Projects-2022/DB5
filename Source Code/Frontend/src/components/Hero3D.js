import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Trail, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Atom(props) {
    const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), []);
    return (
        <group {...props}>
            <Line worldUnits points={points} color="#60a5fa" lineWidth={0.3} />
            <Line worldUnits points={points} color="#3b82f6" lineWidth={0.3} rotation={[0, 0, 1]} />
            <Line worldUnits points={points} color="#2563eb" lineWidth={0.3} rotation={[0, 0, -1]} />
            <Sphere />
        </group>
    );
}

function Sphere() {
    return (
        <mesh>
            <sphereGeometry args={[0.8, 64, 64]} />
            <meshPhysicalMaterial
                color="#3b82f6"
                emissive="#1d4ed8"
                emissiveIntensity={0.8}
                roughness={0.1}
                metalness={0.9}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transmission={0.2}
                thickness={1}
            />
        </mesh>
    );
}

function Line({ points, color, lineWidth, ...props }) {
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return geo;
    }, [points]);

    return (
        <line loop={true} {...props}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial attach="material" color={color} linewidth={lineWidth} transparent opacity={0.6} />
        </line>
    );
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI, 0);
    });
    return (
        <group {...props}>
            <Trail local width={4} length={8} color={new THREE.Color(props.color)} attenuation={(t) => t * t}>
                <mesh ref={ref}>
                    <sphereGeometry args={[0.15, 32, 32]} />
                    <meshPhysicalMaterial
                        color={props.color}
                        emissive={props.color}
                        emissiveIntensity={4}
                        toneMapped={false}
                        roughness={0}
                        metalness={0}
                    />
                    <pointLight color={props.color} intensity={2} distance={3} decay={2} />
                </mesh>
            </Trail>
        </group>
    );
}

function Scene() {
    return (
        <>
            <color attach="background" args={['#000000']} />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={5} color="#2563eb" />

            {/* Environment for reflections */}
            <Environment preset="city" />

            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <Atom />
            </Float>

            <Electron position={[0, 0, 0.5]} speed={0.5} color="#60a5fa" />
            <Electron position={[0, 0, 0.5]} speed={0.8} rotation={[0, 0, Math.PI / 3]} color="#3b82f6" />
            <Electron position={[0, 0, 0.5]} speed={1.1} rotation={[0, 0, -Math.PI / 3]} color="#2563eb" />

            <Stars saturation={0} count={800} speed={0.2} fade depth={50} />
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#172033" />
        </>
    );
}

export default function Hero3D() {
    return (
        <div className="hero-3d-container">
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
                <Scene />
            </Canvas>
        </div>
    );
}
