import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { Mesh } from 'three';
import SelectablePart from './SelectablePart';

interface CarModelProps {
  onPartSelect?: (partName: string) => void;
  onPartHover?: (partName: string | null) => void;
}

const CarModel: React.FC<CarModelProps> = ({ onPartSelect, onPartHover }) => {
  const bodyRef = useRef<Mesh>(null);

  useFrame(() => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <gridHelper args={[20, 20]} />

      {/* Car body */}
      <SelectablePart
        name="body"
        onSelect={onPartSelect}
        onHover={onPartHover}
        ref={bodyRef}
        position={[0, 1, 0]}
      >
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="red" />
      </SelectablePart>

      {/* Wheels */}
      {[
        [-1.5, 0, 1],
        [1.5, 0, 1],
        [-1.5, 0, -1],
        [1.5, 0, -1],
      ].map((position, index) => (
        <SelectablePart
          key={`wheel-${index}`}
          name={`wheel-${index + 1}`}
          onSelect={onPartSelect}
          onHover={onPartHover}
          position={position as [number, number, number]}
        >
          <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="black" />
        </SelectablePart>
      ))}
    </>
  );
};

export default CarModel;
