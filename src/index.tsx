import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MediaStreamProvider } from './contexts/MediaStreamContext';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { AudioAnalyserProvider } from './contexts/AudioAnalyserContext';
import { InputAudioProvider } from './contexts/InputAudioContext';

ReactDOM.render(
  <MediaStreamProvider video={false} audio={true}>
    <InputAudioProvider>
      <AudioAnalyserProvider>
        <App />
      </AudioAnalyserProvider>
    </InputAudioProvider>
  </MediaStreamProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
