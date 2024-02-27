
import { useEffect, useRef, useState } from 'react';
import Menu from './Menu';
import './App.css';

function App() {
  const [brushColor, setBrushColor] = useState('black');
  const [brushWidth, setBrushWidth] = useState(8);
  const [brushOpacity, setBrushOpacity] = useState(0.1);
  const [fillColor, setFillColor] = useState('transparent');
  const [isDraw, setIsDraw] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = brushOpacity;

    if (isEraser) {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = brushWidth * 2;
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.strokeStyle = brushColor;
      ctx.fillStyle = fillColor; // Set fill color
      ctx.lineWidth = brushWidth;
      ctx.globalCompositeOperation = 'source-over';
    }
    ctxRef.current = ctx;
  }, [brushColor, brushWidth, brushOpacity, fillColor, isEraser]);

  const startDraw = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDraw(true);
  };

  const endDraw = () => {
    if (fillColor !== 'transparent') {
      ctxRef.current.fill(); // Fill the shape if fill color is selected
    }
    ctxRef.current.closePath();
    setIsDraw(false);
  };

  const Draw = (e) => {
    if (!isDraw) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  return (
    <div className="App">
      <h1>Paint-App</h1>
      <div className="draw-area">
        <Menu
          setBrushColor={setBrushColor}
          setBrushWidth={setBrushWidth}
          setBrushOpacity={setBrushOpacity}
          setFillColor={setFillColor}
          toggleEraser={toggleEraser}
        />
        <canvas
          width="1200px"
          height="500px"
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseUp={endDraw}
          onMouseMove={Draw}
        ></canvas>
      </div>
    </div>
  );
}

export default App;
