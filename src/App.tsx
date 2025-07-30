import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import CarModel from './components/CarModel';
import './App.css';

interface CarDetails {
  year: string;
  make: string;
  model: string;
}

const App: React.FC = () => {
  const [carDetails, setCarDetails] = useState<CarDetails>({
    year: '',
    make: '',
    model: ''
  });
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., load specific car model)
    console.log('Car details submitted:', carDetails);
  };

  const handlePartSelect = (partName: string) => {
    setSelectedPart(partName);
    console.log('Selected part:', partName);
  };

  const handlePartHover = (partName: string | null) => {
    setHoveredPart(partName);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Filter parts based on search query
    console.log('Searching for:', e.target.value);
  };

  return (
    <div className="app">
      <div className="controls">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Year"
            value={carDetails.year}
            onChange={(e) => setCarDetails({ ...carDetails, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Make"
            value={carDetails.make}
            onChange={(e) => setCarDetails({ ...carDetails, make: e.target.value })}
          />
          <input
            type="text"
            placeholder="Model"
            value={carDetails.model}
            onChange={(e) => setCarDetails({ ...carDetails, model: e.target.value })}
          />
          <button type="submit">Load Car</button>
        </form>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search car parts..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {hoveredPart && (
          <div className="tooltip">
            Hovering over: {hoveredPart}
          </div>
        )}

        {selectedPart && (
          <div className="selected-part">
            Selected part: {selectedPart}
          </div>
        )}
      </div>

      <div className="car-viewer">
        <Canvas>
          <CarModel
            onPartSelect={handlePartSelect}
            onPartHover={handlePartHover}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
