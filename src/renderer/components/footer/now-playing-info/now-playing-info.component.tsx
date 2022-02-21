import * as React from 'react';
import { NowPlaying } from '../../../store/now-playing/now-playing.slice';

const NowPlayingInfo: React.FC<{
  currentAudioPlayingTime: {
    totalTime: number;
    currentTime: number;
  };
  nowPlaying: NowPlaying;
}> = ({
  currentAudioPlayingTime,
  nowPlaying,
}: {
  currentAudioPlayingTime: {
    totalTime: number;
    currentTime: number;
  };
  nowPlaying: NowPlaying;
}) => {
  // Need a convert function to handle the time which is returned in seconds from
  // wavesurfer.js
  const convertNumToTime = (time: number) => {
    // Hours, minutes and seconds
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = '';
    if (hrs > 0) {
      ret += `${hrs}:${mins < 10 ? '0' : ''}`;
    }
    ret += `${mins}:${secs < 10 ? '0' : ''}`;
    ret += `${secs}`;
    return ret;
  };

  return (
    <div
      className="flex flex-col justify-center mx-5 w-36"
      style={{ minWidth: '90px' }}
    >
      <div className="mx-auto text-xl font-bold">
        {nowPlaying.audioTrack?.camelotWheelKey}
      </div>
      <div className="mx-auto text-xl font-bold">
        {convertNumToTime(currentAudioPlayingTime.currentTime)}/
        {convertNumToTime(currentAudioPlayingTime.totalTime)}
      </div>
    </div>
  );
};

export default NowPlayingInfo;
