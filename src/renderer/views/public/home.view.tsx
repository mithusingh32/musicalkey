import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import Waveform from '../../components/public/waveform.component';

const Home = () => {
  const [title, setTitle] = useState('');
  const [audioData, setAudioData] = useState('');

  ipcRenderer.on('returnFromProcessAudio', (event, args) => {
    setAudioData(args);
  });

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <h1 className="font-sans text-4xl text-white">Musical Key</h1>
      <input
        type="file"
        id="avatar"
        name="avatar"
        onChange={(inputEvent: React.ChangeEvent<HTMLInputElement>) => {
          if (inputEvent.target.files) {
            ipcRenderer.send('processAudio', inputEvent.target.files[0].path);
            setTitle(inputEvent.target.files[0].path);
          }
        }}
      />
      {title === null || title === '' ? (
        <div className="bg-gray-500 p-5 text-center">Tailwind</div>
      ) : (
        <Waveform inFileLocation={title} audioData={audioData} />
      )}
      <div className="Hello" />
    </div>
  );
};

export default Home;
