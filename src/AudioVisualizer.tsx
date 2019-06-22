import React, { createRef, FunctionComponent, useEffect } from 'react';

interface Props {
  audioData: Uint8Array;
}

const AudioVisualiser: FunctionComponent<Props> = ({ audioData }) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const { height, width } = canvas;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1.0) / audioData.length;

        if (context) {
          context.lineWidth = 5;
          context.strokeStyle = '#fff';
          context.clearRect(0, 0, width, height);

          context.beginPath();
          context.moveTo(0, height / 2);
          for (const item of audioData) {
            const y = (item / 255.0) * height;
            context.lineTo(x, y);
            x += sliceWidth;
          }
          context.lineTo(x, height / 2);
          context.stroke();
        }
      }
    };
    draw();
  }, [audioData, canvasRef]);

  return <canvas width="600" height="300" ref={canvasRef} />;
};

export default AudioVisualiser;
