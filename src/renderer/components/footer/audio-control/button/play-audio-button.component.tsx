import * as React from 'react';

const AudioPlayButton = ({
  togglePlayPause,
}: {
  togglePlayPause: () => void;
}) => {
  return (
    <svg
      className="w-20 h-20 my-auto cursor-pointer"
      onClick={togglePlayPause}
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 0 194.03 194.03"
    >
      <g transform="translate(32.758 -144.89)">
        <path
          d="m33.035 242.08v-54.585l47.272 27.291 47.272 27.294-47.272 27.291-47.272 27.294v-54.585"
          style={{ fill: '#fff' }}
        />
      </g>
    </svg>
  );
};

export default AudioPlayButton;
