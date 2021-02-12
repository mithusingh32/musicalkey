import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron/main';
import icon from '../../../../assets/icon.svg';

const Home = () => {
  const [title, setTitle] = useState('');

  ipcRenderer.on('returnFromProcessAudio', (event, args) => {
    console.log(event);
    console.log(args);
  });

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="bg-gray-500 p-5 text-center">Tailwind</div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        onChange={(inputEvent: React.ChangeEvent<HTMLInputElement>) => {
          if (inputEvent.target.files) {
            ipcRenderer.send('processAudio', inputEvent.target.files[0].path);
          }
        }}
      />
      <div className="Hello" />
    </div>
  );
};

export default Home;
