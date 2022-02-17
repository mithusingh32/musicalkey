import { RxDocument, RxCollection, RxDatabase } from 'rxdb';
import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
} from 'rxdb/plugins/core';

const audioSchemaLiteral = {
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
} as const; // <- It is important to set 'as const' to preserve the literal type
const schemaTyped = toTypedRxJsonSchema(audioSchemaLiteral);

// aggregate the document type from the schema
export type AudioDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

// create the typed RxJsonSchema from the literal typed object.
export const heroSchema: RxJsonSchema<AudioDocType> = audioSchemaLiteral;

export type AudioDocument = RxDocument<AudioDocType>;

export type AudioCollection = RxCollection<AudioDocType>;

export type MyDatabaseCollection = {
  audiodata: AudioCollection;
};

export type MyDatabase = RxDatabase<MyDatabaseCollection>;

export default audioSchemaLiteral;
