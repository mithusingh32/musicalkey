import { fromString } from 'uuidv4';
import { AudioData } from '../../renderer/interfaces/audio.interface';

// Load PouchDB
const PouchDB = require('pouchdb');

// Load db plugins
const pouchdbDebug = require('pouchdb-debug');
const pouchdbFind = require('pouchdb-find');

PouchDB.plugin(pouchdbDebug).plugin(pouchdbFind);

const db = new PouchDB('audio-data');

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  PouchDB.debug.enable('*');
  db.put({
    _id: '1',
    error: null,
    location: 'location1',
    title: 'Title1',
    artist: 'Artist1',
    album: 'Album1',
    length: 180,
    camelotWheelKey: '4A',
    chordName: 'Cm',
    bpm: 100,
  });

  db.put({
    _id: '2',
    error: null,
    location: 'location2',
    title: 'Title2',
    artist: 'Artist2',
    album: 'Album2',
    length: 130,
    camelotWheelKey: '9A',
    chordName: 'Em',
    bpm: 70,
  });

  db.put({
    _id: '3',
    error: null,
    location: 'location3',
    title: 'Title3',
    artist: 'Artist3',
    album: 'Album3',
    length: 120,
    camelotWheelKey: '9A',
    chordName: 'Em',
    bpm: 70,
  });
}

// Create new entry or update existing entry based on UUID
export const putIntoDatabse = (inAudioData: AudioData) => {
  const uuid = fromString(inAudioData.location);
  db.put({
    _id: uuid,
    ...inAudioData,
  }).catch((err: any) => err);
};

// Retreives all the entries in the databse
export const getAllAudioDocs = () => {
  return db.allDocs();
};
