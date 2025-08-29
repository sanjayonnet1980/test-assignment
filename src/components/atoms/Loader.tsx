import React from 'react';
import './Loader.css'; // External styles for customization

interface LoaderProps {
  size?: number; // Diameter in px
  color?: string; // Spinner color
  overlay?: boolean; // Fullscreen overlay
}

const Loader: React.FC<LoaderProps> = ({ size = 40, color = '#4f46e5', overlay = false }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    borderColor: `${color} transparent ${color} transparent`,
  };

  return (
    <div className={overlay ? 'loader-overlay' : ''}>
      <div className="spinner" style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;