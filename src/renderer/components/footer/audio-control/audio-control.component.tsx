import * as React from 'react';

const AudioControl = () => {
  return (
    <div className="flex h-28">
      <div className="text-center bg-blue-400 h-28" style={{ width: '18em' }}>
        Now Playing Audio Controls
      </div>
      <div className="bg-blue-300 h-28" style={{ width: '10em' }}>
        Now Playing Metadata
      </div>
    </div>
  );
};

export default AudioControl;
