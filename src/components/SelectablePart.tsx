import React from 'react';
import type { ThreeElements } from '@react-three/fiber';
import type { Mesh } from 'three';
import { useRef } from 'react';

interface SelectablePartProps {
  name: string;
  onSelect?: (name: string) => void;
  onHover?: (name: string | null) => void;
  children?: React.ReactNode;
  position?: [number, number, number];
  ref?: React.RefObject<Mesh>;
}

const SelectablePart: React.FC<SelectablePartProps> = ({ 
  name, 
  onSelect, 
  onHover, 
  children, 
  position = [0, 0, 0],
  ...props 
}) => {
  const meshRef = useRef<Mesh>(null);

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (onHover) onHover(name);
  };

  const handlePointerOut = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (onHover) onHover(null);
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (onSelect) onSelect(name);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      {...props}
    >
      {children}
    </mesh>
  );
};

export default SelectablePart;
