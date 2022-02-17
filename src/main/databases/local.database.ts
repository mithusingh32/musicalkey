import {
  AudioCollection,
  AudioDocType,
  MyDatabase,
} from 'main/types/database.type';
import {
  addPouchPlugin,
  createRxDatabase,
  getRxStoragePouch,
  PouchSettings,
  PouchStorageInternals,
  RxCollection,
  RxDatabase,
  RxJsonSchema,
} from 'rxdb';

addPouchPlugin(require('pouchdb-adapter-leveldb'));
const leveldown = require('leveldown');

const audioSchema: RxJsonSchema<AudioDocType> = {
  keyCompression: true, // set this to true, to enable the keyCompression
  version: 0,
  title: 'human schema with composite primary',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string' },
    key: { type: 'string' },
    error: { type: 'string' },
    location: { type: 'string' },
    title: { type: 'string' },
    artist: { type: 'string' },
    album: { type: 'string' },
    length: { type: 'string' },
    camelotWheelKey: { type: 'string' },
    chordName: { type: 'string' },
    bpm: { type: 'string' },
    playlist: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['id', 'key', 'location', 'camelotWheelKey', 'chordName'],
};

let database: Promise<any>;
// create a database
const createDB = async () => {
  // add the pouchdb indexeddb adapter
  console.log('Creating database');
  const db = await createRxDatabase<AudioCollection>({
    // the name of the database
    name: 'audiodatabase',
    // use pouchdb with the indexeddb-adapter as storage engine.
    storage: getRxStoragePouch(leveldown),
  });

  console.log('Creating collections');
  await db.addCollections({
    audiodata: {
      schema: audioSchema,
    },
  });

  return db;
};

const getDB = () => {
  if (!database) database = createDB();
  return database;
};

export default getDB;
