import React from 'react';
import './Menu.css';

const Menu = ({
  setBrushColor,
  setBrushWidth,
  setBrushOpacity,
  setFillColor,
  setShape, // Added function to set the shape
  toggleEraser,
}) => {
  return (
    <div className='menu'>
      <label htmlFor="brush">Brush Color:</label>
      <input type="color" onChange={(e) => setBrushColor(e.target.value)} />

      <label htmlFor="brush_width">Brush Width:</label>
      <input type="range" min="3" max="100" onChange={(e) => setBrushWidth(e.target.value)} />

      <label htmlFor="brush_opacity">Brush Opacity:</label>
      <input type="range" min="0" max="0.5" step="0.01" onChange={(e) => setBrushOpacity(e.target.value)} />

      <label htmlFor="fill_color">Fill Color:</label>
      <input type="color" onChange={(e) => setFillColor(e.target.value)} />

      <div className="eraser-option">
        <input type="checkbox" id="eraser" onChange={toggleEraser} />
        <label htmlFor="eraser">Eraser</label>
      </div>
    </div>
  );
};

export default Menu;
