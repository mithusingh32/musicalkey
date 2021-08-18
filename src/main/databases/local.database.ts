import { fromString } from 'uuidv4';
import { AudioData } from '../../renderer/interfaces/audio.interface';

// Load PouchDB
const PouchDB = require('pouchdb');

// Load db plugins
const pouchdbDebug = require('pouchdb-debug');
const pouchdbFind = require('pouchdb-find');

PouchDB.plugin(pouchdbDebug).plugin(pouchdbFind);

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true')
  PouchDB.debug.enable('*');

const db = new PouchDB('audio-data');

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
