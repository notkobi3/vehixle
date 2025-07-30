import React from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import SelectablePart from './SelectablePart';

interface CarModelProps {
  onPartSelect?: (partName: string) => void;
  onPartHover?: (partName: string | null) => void;
  color: string;
}

const CarModel: React.FC<CarModelProps> = ({ onPartSelect, onPartHover, color }) => {
  return (
    <>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Garage floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Car body */}
      <SelectablePart
        name="body"
        onSelect={onPartSelect}
        onHover={onPartHover}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
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
            <meshStandardMaterial color="black" roughness={0.7} metalness={0.3} />
          </group>
        </SelectablePart>
      ))}

      {/* Garage walls */}
      <mesh position={[0, 5, -15]} receiveShadow>
        <boxGeometry args={[30, 15, 0.5]} />
        <meshStandardMaterial color="#555555" roughness={0.9} />
      </mesh>
      <mesh position={[-15, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 15, 0.5]} />
        <meshStandardMaterial color="#555555" roughness={0.9} />
      </mesh>
      <mesh position={[15, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 15, 0.5]} />
        <meshStandardMaterial color="#555555" roughness={0.9} />
      </mesh>

      <OrbitControls />
    </>
  );
};

export default CarModel;
