import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const pins = [
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 52.5074, lng: 10.1278, label: "London" },
];
const radius = 2.5;

const Globe: React.FC = () => {
  const texture = useTexture("/globe.jpg");
  const globeRef = useRef<THREE.Mesh>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  const handlePointerOver = (event: any) => {
    setHoveredPin(event.object.userData.label);
  };

  const handlePointerOut = () => {
    setHoveredPin(null);
  };

  const latLngToVector3 = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <mesh ref={globeRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {pins.map((pin, index) => {
        const position = latLngToVector3(pin.lat, pin.lng, radius + 0.01); // Ensure pins are just above the globe surface
        return (
          <mesh
            key={index}
            position={position}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            userData={{ label: pin.label }}
          >
            <cylinderGeometry args={[0.01, 0.01, 0.1, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      })}
      <OrbitControls />
    </>
  );
};

export default Globe;
