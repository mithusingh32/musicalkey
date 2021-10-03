import * as React from 'react';
import * as RRedux from 'react-redux';
import { togglePlayPause } from '../../../store/now-playing/now-playing.slice';
import { RootState } from '../../../store/store';
import AudioBackButton from './button/back-audio-button.component';
import AudioPauseButton from './button/pause-audio-button.component';
import AudioPlayButton from './button/play-audio-button.component';
import AudioSkipButton from './button/skip-audio-button.component';

const AudioControl = () => {
  const dispatch = RRedux.useDispatch();
  const nowPlayingState = RRedux.useSelector(
    (state: RootState) => state.nowPlaying
  );
  const togglePlayPauseAction = () => {
    // If the audio is loaded, toggle the isPlaying state
    // otherwise set it to false
    if (nowPlayingState.isLoaded === 'loaded') {
      dispatch(togglePlayPause(!nowPlayingState.isPlaying));
    } else dispatch(togglePlayPause(false));
  };
  return (
    <div className="flex h-28">
      <div className="flex w-full bg-blue-400 h-28" style={{ width: '18em' }}>
        <div className="flex mx-auto">
          <AudioBackButton />
          {nowPlayingState.isPlaying ? (
            <AudioPauseButton togglePlayPause={togglePlayPauseAction} />
          ) : (
            <AudioPlayButton togglePlayPause={togglePlayPauseAction} />
          )}
          <AudioSkipButton />
        </div>
      </div>
    </div>
  );
};

export default AudioControl;
