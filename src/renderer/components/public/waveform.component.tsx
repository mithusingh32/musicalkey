import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({
  inFileLocation,
  audioData,
}: {
  inFileLocation: string;
  audioData: any;
}) => {
  const [playPause, setPlayPause] = useState(false);

  const wavesurfer = useRef(null);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: wavesurfer.current,
      waveColor: 'violet',
      progressColor: 'purple',
    });

    wavesurfer.current.load(inFileLocation);
    wavesurfer.current.play();
  }, [inFileLocation]);

  const handlePlayPause = () => {
    // setPlayPause(!playPause);
    wavesurfer.current.playPause();
  };

  return (
    <div>
      <h2>{audioData.title}</h2>
      <h3>
        Key: {audioData.camelotWheelKey} - {audioData.chordName}
      </h3>
      <div ref={wavesurfer} />
      <button type="button" onClick={handlePlayPause}>
        Play/Pause
      </button>
    </div>
  );
};

export default Waveform;
