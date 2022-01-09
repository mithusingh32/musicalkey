import { ipcMain } from 'electron';
import mainStore from '../store';

ipcMain.on('updateLastPlay', (args) => {
  mainStore.set('lastPlayed', args);
});

ipcMain.on('getLastPlayed', () => {});
