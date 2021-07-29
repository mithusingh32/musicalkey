import * as React from 'react';
import AudioControl from './audio-control/audio-control.component';
import Waveform from './waveform/waveform.component';

const Footer = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 flex w-screen bg-blue-500 h-28">
      <AudioControl />
      <Waveform />
    </div>
  );
};

export default Footer;
