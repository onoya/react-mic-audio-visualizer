import React, { FunctionComponent, useState } from 'react';
import './App.css';
import AudioAnalyser from './AudioAnalyser';

const App: FunctionComponent = () => {
  const [stream, setStream] = useState<null | MediaStream>(null);

  const openMic = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    setStream(mediaStream);
  };

  const closeMic = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const toggleMic = () => {
    if (stream) {
      closeMic();
    } else {
      openMic();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-btn" onClick={toggleMic}>
          {stream ? 'Close Microphone' : 'Open Microphone'}
        </button>
        {stream && <AudioAnalyser stream={stream} />}
      </header>
    </div>
  );
};

export default App;
