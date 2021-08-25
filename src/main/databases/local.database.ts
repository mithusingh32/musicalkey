import { fromString } from 'uuidv4';
import { AudioData } from '../../renderer/interfaces/audio.interface';
import makeData from '../../utils/makeDBData';

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
  db.info()
    .then((dbInfo: any) => {
      if (dbInfo.doc_count === 0) {
        makeData(50).forEach((element: any) => {
          db.put(element);
        });
      }
      return null;
    })
    .catch(() => {});
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
  return db.allDocs({
    include_docs: true,
  });
};
