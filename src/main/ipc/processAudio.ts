import { ipcMain } from 'electron';
import * as fs from 'fs';
import { AudioData } from '../../renderer/interfaces/audio.interface';

const AudioAnalyzerAddon = require('../../../release/app/audio-processor.node');

// Event handler for asynchronous incoming messages
ipcMain.on('processAudio', async (event, args) => {
  try {
    AudioAnalyzerAddon.getAudioData(args, (err: any, resp: AudioData) => {
      if (err) {
        event.reply('getAudioData', err);
      } else {
        event.reply('getAudioData', resp);
      }
    });
  } catch (e) {
    event.reply('getAudioData', e);
  }
});

// This let's renderer get access to the file on the system to
// load into wavesurfer.hs
ipcMain.on('getFileObject', async (event, inFilePath) => {
  fs.readFile(inFilePath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
    if (err != null) event.returnValue = 'err';
    else {
      const resultArray = new Uint8Array(data);
      event.returnValue = resultArray;
    }
  });
});
