import React, { FunctionComponent, useLayoutEffect, useState } from 'react';
import AudioVisualiser from './AudioVisualizer';

interface Props {
  stream: MediaStream;
}

interface State {
  audioData: Uint8Array;
}

const AudioAnalyser: FunctionComponent<Props> = ({ stream }) => {
  const [state, setState] = useState<State>({
    audioData: new Uint8Array(0),
  });

  useLayoutEffect(() => {
    let raf: number;
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const onChange = () => {
      if (analyser && dataArray) {
        analyser.getByteTimeDomainData(dataArray);
        setState(state => ({ ...state, audioData: dataArray }));
      }
      raf = requestAnimationFrame(onChange);
    };
    raf = requestAnimationFrame(onChange);

    return () => {
      cancelAnimationFrame(raf);
      if (analyser && source) {
        analyser.disconnect();
        source.disconnect();
      }
    };
  }, [stream]);

  return <AudioVisualiser audioData={state.audioData} />;
};

export default AudioAnalyser;
