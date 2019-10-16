import React, { FunctionComponent } from 'react';
import './App.css';
import AudioVisualiser from './AudioVisualizer';
import { useMediaStream } from './contexts/MediaStreamContext';

const App: FunctionComponent = () => {
  const { stream, start, stop } = useMediaStream();

  const toggleMic = () => stream ? stop() : start();

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-btn" onClick={toggleMic}>
          {stream ? 'Close Microphone' : 'Open Microphone'}
        </button>
        <AudioVisualiser />
      </header>
    </div>
  );
};

export default App;
