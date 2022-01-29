import { ipcRenderer } from 'electron';
import * as React from 'react';
import * as RRedux from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import {
  togglePlayPause,
  updateNowPlaying,
} from '../../../store/now-playing/now-playing.slice';
import { RootState } from '../../../store/store';

const Waveform = ({
  inAudioFilePath,
  setCurrentTime,
  height,
}: {
  inAudioFilePath: string;
  setCurrentTime: (inTime: { totalTime: number; currentTime: number }) => void;
  height: number | undefined;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wavesurfer = React.useRef<any>(null);
  const dispatch = RRedux.useDispatch();
  const [loadingError, setLoadingError] = React.useState(false);
  const isPlaying = RRedux.useSelector((state: RootState) => {
    return state.nowPlaying.isPlaying;
  });

  // TODO: Dynamically get the width and size and pass that into the
  React.useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: wavesurfer.current,
      height,
      hideScrollbar: true,
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 2.0,
      responsive: true,
      normalize: true,
    });
    const fileBlob = ipcRenderer.sendSync('getFileObject', inAudioFilePath);
    if (fileBlob === 'err') setLoadingError(true);

    if (wavesurfer.current && fileBlob !== 'err') {
      // TODO Make this more effecient
      // We need to creaet a blob from the Uint8Array to play audio because
      // the renderer process cannot access the local filesystem
      const blob = new Blob([fileBlob], { type: 'audio/mp3' });
      wavesurfer.current.loadBlob(blob);
      wavesurfer.current.on('seek', () => {
        wavesurfer.current.play(
          wavesurfer.current.getCurrentTime(),
          wavesurfer.current.getDuration()
        );
        dispatch(togglePlayPause(wavesurfer.current.isPlaying())); // Update toggle state
      });

      // Autoplay when track is loaded
      wavesurfer.current.on('ready', () => {
        // TODO Allow user to control weather to play track on 'ready' or just load the track and not auto-play it.
        wavesurfer.current.play();
        // Update the isPlayingState once wavesurfer is ready to play.
        dispatch(
          updateNowPlaying({
            isPlaying: wavesurfer.current.isPlaying(),
            isLoaded: 'loaded',
          })
        );
      });
    }

    wavesurfer.current.on('audioprocess', () => {
      if (wavesurfer.current.isPlaying()) {
        setCurrentTime({
          totalTime: wavesurfer.current.getDuration(),
          currentTime: wavesurfer.current.getCurrentTime(),
        });
      }
    });
  }, [inAudioFilePath, setCurrentTime, dispatch, height]);

  React.useEffect(() => {
    if (wavesurfer && wavesurfer.current) {
      if (isPlaying) wavesurfer.current.play();
      else wavesurfer.current.pause();
    }
  }, [isPlaying, dispatch]);

  if (loadingError)
    return (
      <div className="w-full text-center bg-blue-200">Error Loading File</div>
    );
  return <div className="w-full text-center bg-blue-200" ref={wavesurfer} />;
};

export default Waveform;
