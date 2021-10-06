import { ipcRenderer } from 'electron';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AudioControl from './audio-control/audio-control.component';
import NowPlayingInfo from './now-playing-info/now-playing-info.component';
import Waveform from './waveform/waveform.component';

const Footer = () => {
  // TODO Move this to the correct component (not sure which it is right now).
  ipcRenderer.on('process', (event, arg) => {
    console.log(arg);
  });
  const [audioFile, setAudioFile] = React.useState('');
  const [nowPlayingCurrentTime, setNowPlayingCurrentTime] = React.useState({
    totalTime: 0,
    currentTime: 0,
  });
  const nowPlayingStore = useSelector((state: RootState) => state.nowPlaying);

  React.useEffect(() => {
    if (audioFile !== '') {
      ipcRenderer.send('processAudio', audioFile);
    }
  }, [audioFile]);

  return (
    <div className="absolute inset-x-0 bottom-0 flex w-screen bg-blue-500 h-28">
      <AudioControl />
      <NowPlayingInfo
        currentAudioPlayingTime={nowPlayingCurrentTime}
        nowPlaying={nowPlayingStore}
      />
      {audioFile === '' ? (
        // TODO: Remove this input for audio file. THis is currently being used as a test
        // TODO: Add some real test files to the project so we don't need to generate fake data.
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files !== null) {
              setAudioFile(e.target.files[0].path);
            }
          }}
        />
      ) : (
        // Waveform Component will update the current playing time state
        <Waveform
          inAudioFilePath={audioFile}
          setCurrentTime={setNowPlayingCurrentTime}
        />
      )}
    </div>
  );
};

export default Footer;
