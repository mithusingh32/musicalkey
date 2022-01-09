// Main store for storing config
const Store = require('electron-store');

const schema = {
  enableRemoteDatabase: {
    type: 'boolean',
    default: false,
  },
  lastPlayed: {
    type: 'string',
    default: '',
  },
};

const mainStore = new Store(schema);

export default mainStore;
