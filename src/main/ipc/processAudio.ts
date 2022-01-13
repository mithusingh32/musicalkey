import { ipcMain } from 'electron';
import { AudioData } from '../../renderer/interfaces/audio.interface';

const AudioAnalyzerAddon = require('../../../release/app/audio-processor.node');

// Event handler for asynchronous incoming messages
ipcMain.on('processAudio', async (event, args) => {
  AudioAnalyzerAddon.getAudioData(args, (err: any, resp: AudioData) => {
    if (err) {
      event.reply('getAudioData', 'Bad audio');
    } else {
      event.reply('getAudioData', resp);
    }
  });
});
