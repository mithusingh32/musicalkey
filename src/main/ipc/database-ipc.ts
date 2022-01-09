import { ipcMain } from 'electron';
import { getAllAudioDocs } from '../databases/local.database';

// IPC handler for getting all of the entried in the database
ipcMain.handle('getAllDocs', async () => {
  return getAllAudioDocs();
});
