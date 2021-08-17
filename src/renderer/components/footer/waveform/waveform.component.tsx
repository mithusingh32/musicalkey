import * as React from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ inAudioFilePath }: { inAudioFilePath: string }) => {
  const wavesurfer = React.useRef(null);

  const handleButton = () => {
    wavesurfer.current.playPause();
  };

  React.useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: wavesurfer.current,
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 3.0,
      responsive: true,
      normalize: true,
    });

    if (wavesurfer !== null && wavesurfer.current !== null) {
      wavesurfer.current.load(inAudioFilePath);
      wavesurfer.current.play();
      wavesurfer.current.on('seek', () => {
        wavesurfer.current.play(
          wavesurfer.current.getCurrentTime(),
          wavesurfer.current.getDuration()
        );
      });
    }
  }, [inAudioFilePath]);

  return (
    <div className="w-screen text-center bg-blue-200 h-28 relataive">
      <button type="button" onClick={handleButton}>
        Play/Pause
      </button>
      <div ref={wavesurfer} />
    </div>
  );
};

export default Waveform;
