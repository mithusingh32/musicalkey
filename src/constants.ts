/* eslint-disable prettier/prettier */
export const musicalChordNames = [
  "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", /// major
  "Am", "A#m", "Bm", "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m" /// minor
];

export const camelotChordNames = [
  "11B", "6B", "1B", "8B", "3B", "10B", "5B", "12B", "7B", "2B", "9B", "4B", /// major
  "8A", "3A", "10A", "5A", "12A", "7A", "2A", "9A", "4A", "11A", "6A", "1A" /// minor
];

export const camelotChordNamesAndSemitones:{ [key: string]: any } = {
  '11A': { plus_one: '6A',  minus_one: '4A',  plus_two: '1A',  minus_two: '9A' },
  '6A':  { plus_one: '1A',  minus_one: '11A', plus_two: '8A',  minus_two: '4A' },
  '1A':  { plus_one: '8A',  minus_one: '6A',  plus_two: '3A',  minus_two: '11A' },
  '8A':  { plus_one: '3A',  minus_one: '1A',  plus_two: '10A', minus_two: '6A' },
  '3A':  { plus_one: '10A', minus_one: '8A',  plus_two: '5A',  minus_two: '1A' },
  '10A': { plus_one: '5A',  minus_one: '3A',  plus_two: '12A', minus_two: '8A' },
  '5A':  { plus_one: '12A', minus_one: '10A', plus_two: '7A',  minus_two: '3A' },
  '12A': { plus_one: '7A',  minus_one: '5A',  plus_two: '2A',  minus_two: '10A' },
  '7A':  { plus_one: '2A',  minus_one: '12A', plus_two: '9A',  minus_two: '5A' },
  '2A':  { plus_one: '9A',  minus_one: '7A',  plus_two: '4A',  minus_two: '12A' },
  '9A':  { plus_one: '4A',  minus_one: '2A',  plus_two: '11A', minus_two: '7A' },
  '4A':  { plus_one: '11A', minus_one: '9A',  plus_two: '6A',  minus_two: '2A' },
  '11B': { plus_one: '6B',  minus_one: '4B',  plus_two: '1B',  minus_two: '9B' },
  '6B':  { plus_one: '1B',  minus_one: '11B', plus_two: '8B',  minus_two: '4B' },
  '1B':  { plus_one: '8B',  minus_one: '6B',  plus_two: '3B',  minus_two: '11B' },
  '8B':  { plus_one: '3B',  minus_one: '1B',  plus_two: '10B', minus_two: '6B' },
  '3B':  { plus_one: '10B', minus_one: '8B',  plus_two: '5B',  minus_two: '1B' },
  '10B': { plus_one: '5B',  minus_one: '3B',  plus_two: '12B', minus_two: '8B' },
  '5B':  { plus_one: '12B', minus_one: '10B', plus_two: '7B',  minus_two: '3B' },
  '12B': { plus_one: '7B',  minus_one: '5B',  plus_two: '2B',  minus_two: '10B' },
  '7B':  { plus_one: '2B',  minus_one: '12B', plus_two: '9B',  minus_two: '5B' },
  '2B':  { plus_one: '9B',  minus_one: '7B',  plus_two: '4B',  minus_two: '12B' },
  '9B':  { plus_one: '4B',  minus_one: '2B',  plus_two: '11B', minus_two: '7B' },
  '4B':  { plus_one: '11B', minus_one: '9B',  plus_two: '6B',  minus_two: '2B' },
};