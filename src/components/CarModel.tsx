import React from 'react';
import { OrbitControls } from '@react-three/drei';
import SelectablePart from './SelectablePart';

interface CarModelProps {
  onPartSelect?: (partName: string) => void;
  onPartHover?: (partName: string | null) => void;
}

const CarModel: React.FC<CarModelProps> = ({ onPartSelect, onPartHover }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <gridHelper args={[20, 20]} />

      {/* Car body */}
      <SelectablePart
        name="body"
        onSelect={onPartSelect}
        onHover={onPartHover}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[3, 1.5, 4]} />
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
          <group rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
            <meshStandardMaterial color="black" />
          </group>
        </SelectablePart>
      ))}

      <OrbitControls />
    </>
  );
};

export default CarModel;
