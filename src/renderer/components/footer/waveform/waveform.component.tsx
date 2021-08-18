import * as React from 'react';
import * as RRedux from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import { togglePlayPause } from '../../../store/now-playing/now-playing.slice';
import { RootState } from '../../../store/store';

const Waveform = ({ inAudioFilePath }: { inAudioFilePath: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wavesurfer = React.useRef<any>(null);
  const dispatch = RRedux.useDispatch();
  const isPlaying = RRedux.useSelector((state: RootState) => {
    return state.nowPlaying.isPlaying;
  });

  React.useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: wavesurfer.current,
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 3.0,
      responsive: true,
      normalize: true,
    });

    if (wavesurfer.current) {
      wavesurfer.current.load(inAudioFilePath);
      wavesurfer.current.on('seek', () => {
        wavesurfer.current.play(
          wavesurfer.current.getCurrentTime(),
          wavesurfer.current.getDuration()
        );
        dispatch(togglePlayPause(wavesurfer.current.isPlaying())); // Update toggle state
      });

      // Autoplay when track is loaded
      wavesurfer.current.on('ready', () => {
        console.log('loaded audio');
        wavesurfer.current.play();
        dispatch(togglePlayPause(wavesurfer.current.isPlaying()));
      });
    }
  }, [inAudioFilePath, dispatch]);

  React.useEffect(() => {
    if (wavesurfer && wavesurfer.current) {
      if (isPlaying) wavesurfer.current.play();
      else wavesurfer.current.pause();
    }
  }, [isPlaying, dispatch]);

  return (
    <div className="w-screen text-center bg-blue-200 h-28 relataive max-h-24">
      <div ref={wavesurfer} />
    </div>
  );
};

export default Waveform;
