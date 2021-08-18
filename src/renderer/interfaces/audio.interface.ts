export interface AudioData {
  error: string | null | undefined;
  location: string;
  title: string;
  artist: string;
  album: string;
  length: string | number;
  camelotWheelKey: string;
  chordName: string;
  bpm: number | string;
}
