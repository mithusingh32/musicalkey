/* eslint-disable @typescript-eslint/no-explicit-any */
import namor from 'namor';
import { camelotChordNames, musicalChordNames } from '../constants';

const range = (len: number) => {
  const arr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; ++i) {
    arr.push(i);
  }
  return arr;
};

const newAudioData = (index: number) => {
  const id = namor.generate({ words: 1 });
  const keyIndex = Math.floor(Math.random() * camelotChordNames.length);
  let playlist;
  if (index % 5 === 0) playlist = ['english', 'punjabi'];
  return {
    _id: id,
    key: id,
    error: '',
    location: namor.generate({ words: 1 }),
    title: namor.generate({ words: 2 }),
    artist: namor.generate({ words: 1 }),
    album: namor.generate({ words: 3 }),
    length: (Math.random() * 500).toFixed(2),
    camelotWheelKey: camelotChordNames[keyIndex],
    chordName: musicalChordNames[keyIndex],
    bpm: (Math.random() * 200).toFixed(2),
    playlist,
  };
};

export default function makeData(...lens: any) {
  const makeDataLevel: any = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => {
      return {
        ...newAudioData(index),
      };
    });
  };

  return makeDataLevel();
}
