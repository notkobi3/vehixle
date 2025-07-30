import React from 'react';
import { ThreeElements } from '@react-three/fiber';

interface SelectablePartProps extends ThreeElements.MeshProps {
  name: string;
  onSelect?: (name: string) => void;
  onHover?: (name: string | null) => void;
  children?: React.ReactNode;
}

const SelectablePart: React.FC<SelectablePartProps> = ({ name, onSelect, onHover, children, ...props }) => {
  const handlePointerOver = (e: THREE.Event) => {
    e.stopPropagation();
    if (onHover) onHover(name);
  };

  const handlePointerOut = (e: THREE.Event) => {
    e.stopPropagation();
    if (onHover) onHover(null);
  };

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    if (onSelect) onSelect(name);
  };

  return (
    <mesh
      {...props}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {children}
    </mesh>
  );
};

export default SelectablePart;
