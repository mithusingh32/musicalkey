import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import { AudioData } from '../../interfaces/audio.interface';

export interface AudioDataCollection {
  [index: number]: { id: string; key: string; doc: AudioData };
}

const initialState: {
  audioData: AudioDataCollection[];
  isLoaded: 'not-loaded' | 'loading' | 'error' | 'loaded';
} = {
  audioData: [],
  isLoaded: 'not-loaded',
};

export const fetchAudioData = createAsyncThunk(
  'AudioDataCollection/fetchAudioData',
  async () => {
    const data = await ipcRenderer
      .invoke('getAllDocs')
      .then((result) => {
        return result.rows;
      })
      .catch((e) => e);
    return data;
  }
);

export const audioDataCollection = createSlice({
  name: 'AudioDataColletion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAudioData.pending, (state) => {
      state.isLoaded = 'loading';
    });
    builder.addCase(fetchAudioData.fulfilled, (state, action) => {
      state.isLoaded = 'loaded';
      state.audioData = action.payload;
    });
    builder.addCase(fetchAudioData.rejected, (state) => {
      state.isLoaded = 'error';
    });
  },
});

// export const {} = audioDataCollection.actions;
export default audioDataCollection.reducer;
