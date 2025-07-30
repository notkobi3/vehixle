import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface CarControlsProps {
  onLoadCar: () => void;
  onColorChange: (color: string) => void;
  isCarLoaded: boolean;
}

const CarControls: React.FC<CarControlsProps> = ({ onLoadCar, onColorChange, isCarLoaded }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ff0000');

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {!isCarLoaded && (
        <button
          onClick={onLoadCar}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Load Car
        </button>
      )}
      
      {isCarLoaded && (
        <div>
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#2196F3',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {showColorPicker ? 'Hide Color Picker' : 'Show Color Picker'}
          </button>
          
          {showColorPicker && (
            <div style={{
              position: 'absolute',
              top: '60px',
              left: '0',
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <HexColorPicker color={selectedColor} onChange={handleColorChange} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarControls;
