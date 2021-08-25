import * as React from 'react';
import * as RRedux from 'react-redux';
import { updateNowPlaying } from '../../store/now-playing/now-playing.slice';
import AudioControl from './audio-control/audio-control.component';
import Waveform from './waveform/waveform.component';

const Footer = () => {
  const [audioFile, setAudioFile] = React.useState('');
  const dispatch = RRedux.useDispatch();

  return (
    <div className="absolute inset-x-0 bottom-0 flex w-screen bg-blue-500 h-28">
      <AudioControl />
      {audioFile === '' ? (
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files !== null) {
              setAudioFile(e.target.files[0].path);
              dispatch(
                updateNowPlaying({
                  audioTrack: {
                    error: '',
                    location: e.target.files[0].path,
                    title: '',
                    artist: '',
                    album: '',
                    length: '',
                    camelotWheelKey: '',
                    chordName: '',
                    bpm: '',
                  },
                  isPlaying: true,
                  isLoaded: 'loaded',
                })
              );
            }
          }}
        />
      ) : (
        <Waveform inAudioFilePath={audioFile} />
      )}
    </div>
  );
};

export default Footer;
