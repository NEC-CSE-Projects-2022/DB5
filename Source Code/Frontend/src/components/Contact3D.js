import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function SatelliteModel({ color }) {
    const materials = useLoader(MTLLoader, '/models/satellite/Satellite.mtl');
    const obj = useLoader(OBJLoader, '/models/satellite/Satellite.obj', (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    // Load Textures
    const texturePath = '/models/satellite/Textures/';
    const [
        antennaColor, antennaNormal, antennaRoughness, antennaMetallic,
        couroColor, couroNormal, couroRoughness, couroMetallic,
        pinosColor, pinosNormal, pinosRoughness, pinosMetallic,
        placasColor, placasNormal, placasRoughness, placasMetallic,
        bodyColor, bodyNormal, bodyRoughness, bodyMetallic
    ] = useLoader(THREE.TextureLoader, [
        texturePath + 'satellite_Antenna_BaseColor.jpg',
        texturePath + 'satellite_Antenna_Normal.jpg',
        texturePath + 'satellite_Antenna_Roughness.jpg',
        texturePath + 'satellite_Antenna_Metallic.jpg',
        texturePath + 'satellite_Couro_BaseColor.jpg',
        texturePath + 'satellite_Couro_Normal.jpg',
        texturePath + 'satellite_Couro_Roughness.jpg',
        texturePath + 'satellite_Couro_Metallic.jpg',
        texturePath + 'satellite_Pinos_BaseColor.jpg',
        texturePath + 'satellite_Pinos_Normal.jpg',
        texturePath + 'satellite_Pinos_Roughness.jpg',
        texturePath + 'satellite_Pinos_Metallic.jpg',
        texturePath + 'satellite_Placas_BaseColor.jpg',
        texturePath + 'satellite_Placas_Normal.jpg',
        texturePath + 'satellite_Placas_Roughness.jpg',
        texturePath + 'satellite_Placas_Metallic.jpg',
        texturePath + 'satellite_Satélite_BaseColor.jpg',
        texturePath + 'satellite_Satélite_Normal.jpg',
        texturePath + 'satellite_Satélite_Roughness.jpg',
        texturePath + 'satellite_Satélite_Metallic.jpg',
    ]);

    const scene = useMemo(() => {
        const clone = obj.clone(true);
        clone.traverse((child) => {
            if (child.isMesh) {
                const matName = child.material.name;

                // Common material properties
                child.material = new THREE.MeshStandardMaterial({
                    map: child.material.map,
                    normalMap: child.material.normalMap,
                    roughnessMap: child.material.roughnessMap,
                    metalnessMap: child.material.metalnessMap,
                });

                if (matName.includes('Antenna')) {
                    child.material.map = antennaColor;
                    child.material.normalMap = antennaNormal;
                    child.material.roughnessMap = antennaRoughness;
                    child.material.metalnessMap = antennaMetallic;
                } else if (matName.includes('Couro')) {
                    child.material.map = couroColor;
                    child.material.normalMap = couroNormal;
                    child.material.roughnessMap = couroRoughness;
                    child.material.metalnessMap = couroMetallic;
                } else if (matName.includes('Pinos')) {
                    child.material.map = pinosColor;
                    child.material.normalMap = pinosNormal;
                    child.material.roughnessMap = pinosRoughness;
                    child.material.metalnessMap = pinosMetallic;
                } else if (matName.includes('Placas')) {
                    child.material.map = placasColor;
                    child.material.normalMap = placasNormal;
                    child.material.roughnessMap = placasRoughness;
                    child.material.metalnessMap = placasMetallic;
                } else if (matName.includes('SatAclite') || matName.includes('Satélite')) {
                    child.material.map = bodyColor;
                    child.material.normalMap = bodyNormal;
                    child.material.roughnessMap = bodyRoughness;
                    child.material.metalnessMap = bodyMetallic;
                    child.material.color = new THREE.Color(color); // Apply flag color tint
                }

                child.material.needsUpdate = true;
            }
        });
        return clone;
    }, [obj, color, antennaColor, antennaNormal, antennaRoughness, antennaMetallic, couroColor, couroNormal, couroRoughness, couroMetallic, pinosColor, pinosNormal, pinosRoughness, pinosMetallic, placasColor, placasNormal, placasRoughness, placasMetallic, bodyColor, bodyNormal, bodyRoughness, bodyMetallic]);

    return <primitive object={scene} scale={0.04} rotation={[0, Math.PI, 0]} />;
}

function Satellite({ color, speed, radius, inclination, initialAngle }) {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed + initialAngle;
        if (ref.current) {
            const x = radius * Math.cos(t);
            const z = radius * Math.sin(t);
            const vector = new THREE.Vector3(x, 0, z);
            vector.applyAxisAngle(new THREE.Vector3(1, 0, 1).normalize(), inclination);

            ref.current.position.copy(vector);
            ref.current.lookAt(0, 0, 0); // Face Earth
            ref.current.rotateY(Math.PI / 2); // Adjust orientation
        }
    });

    return (
        <group ref={ref}>
            <SatelliteModel color={color} />
        </group>
    );
}

function Satellites() {
    const satellites = useMemo(() => {
        const colors = ['#FF9933', '#FFFFFF', '#138808']; // Saffron, White, Green
        const items = [];
        for (let i = 0; i < 15; i++) {
            items.push({
                color: colors[i % 3],
                speed: 0.05 + Math.random() * 0.1, // Reduced speed
                radius: 1.9 + Math.random() * 0.8, // Adjusted for smaller Earth
                inclination: Math.random() * Math.PI,
                initialAngle: Math.random() * Math.PI * 2
            });
        }
        return items;
    }, []);

    return (
        <group>
            <React.Suspense fallback={null}>
                {satellites.map((sat, i) => (
                    <Satellite key={i} {...sat} />
                ))}
            </React.Suspense>
        </group>
    );
}

function Earth() {
    const earthRef = useRef();
    const cloudsRef = useRef();

    // Load Earth textures
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        'https://unpkg.com/three-globe/example/img/earth-topology.png',
        'https://unpkg.com/three-globe/example/img/earth-water.png',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
    ]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (earthRef.current) {
            earthRef.current.rotation.y = t * 0.05;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = t * 0.06; // Clouds move slightly faster
        }
    });

    return (
        <group>
            {/* Earth Sphere with Textures */}
            <Sphere ref={earthRef} args={[1.5, 128, 128]}>
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    specularMap={specularMap}
                    specular={new THREE.Color(0x333333)}
                    shininess={15}
                    displacementMap={normalMap}
                    displacementScale={0.05}
                />
            </Sphere>

            {/* Clouds Layer */}
            <Sphere ref={cloudsRef} args={[1.53, 64, 64]}>
                <meshPhongMaterial
                    map={cloudsMap}
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </Sphere>

            {/* Atmosphere Glow */}
            <Sphere args={[1.6, 64, 64]}>
                <meshPhongMaterial
                    color="#3b82f6"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            <Satellites />
        </group>
    );
}

export default function Contact3D() {
    return (
        <div className="contact-3d-container" style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={['#000000']} />

                {/* Enhanced Lighting Setup */}
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 3, 5]} intensity={5} castShadow />
                <spotLight position={[-5, 5, -5]} angle={0.5} penumbra={1} intensity={3} color="#3b82f6" />
                <pointLight position={[-10, -10, -5]} intensity={2} color="#60a5fa" />

                {/* Environment for realistic reflections */}
                <Environment preset="city" />

                <React.Suspense fallback={null}>
                    <Earth />
                </React.Suspense>

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
            </Canvas>
        </div>
    );
}
