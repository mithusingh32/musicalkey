import * as React from 'react';

const AudioPauseButton = ({
  togglePlayPause,
}: {
  togglePlayPause: () => void;
}) => {
  return (
    <svg
      onClick={togglePlayPause}
      className="w-20 h-20 my-auto"
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 0 194.03 194.03"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(14.615 .25199)">
        <path
          d="m54.353 140.15h13.758v-86.783h-13.758v86.783"
          style={{ fill: '#fff' }}
        />
        <path
          d="m96.686 140.15h13.758v-86.783h-13.758v86.783"
          style={{ fill: '#fff' }}
        />
      </g>
    </svg>
  );
};

export default AudioPauseButton;
