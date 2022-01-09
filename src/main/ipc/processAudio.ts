// import { ipcMain } from 'electron';
// import { IpcMainInvokeEvent } from 'electron/main';
// import { AudioData } from '../../renderer/interfaces/audio.interface';

// const AudioAnalyzerAddon = require('../../audio-processor.node');

// // Event handler for asynchronous incoming messages
// ipcMain.on('processAudio', async (event, args) => {
//   AudioAnalyzerAddon.getAudioData(args, (err: any, resp: AudioData) => {
//     if (err) return err;
//     console.log(resp);
//     event.returnValue = resp;
//     return resp;
//   });
// });
