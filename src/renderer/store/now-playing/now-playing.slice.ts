import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioData } from '../../interfaces/audio.interface';

export interface NowPlaying {
  audioTrack?: AudioData;
  isPlaying: boolean;
  isLoaded: 'not-loaded' | 'loading' | 'error' | 'loaded';
}

const initialState: NowPlaying = {
  audioTrack: {
    error: '',
    location: '',
    title: '',
    artist: '',
    album: '',
    length: '',
    camelotWheelKey: '',
    chordName: '',
    bpm: '',
  },
  isPlaying: false,
  isLoaded: 'not-loaded',
};

export const getLastPlayed = createAsyncThunk(
  'now-playing/getLastPlayed',
  async () => {}
);

export const updateLastPlayed = createAsyncThunk(
  'now-playing/updateLastPlayed',
  async () => {}
);

export const nowPlayingSlice = createSlice({
  name: 'NowPlaying',
  initialState,
  reducers: {
    updateNowPlaying(state: NowPlaying, action: PayloadAction<NowPlaying>) {
      if (
        !action.payload.audioTrack &&
        state.isLoaded !== action.payload.isLoaded &&
        state.isPlaying !== action.payload.isPlaying
      ) {
        return {
          ...state,
          isPlaying: action.payload.isPlaying,
          isLoaded: action.payload.isLoaded,
        };
      }
      return {
        ...state,
        audioTrack: action.payload.audioTrack,
        isPlaying: action.payload.isPlaying,
        isLoaded: 'loading',
      };
    },
    togglePlayPause(state: NowPlaying, action: PayloadAction<boolean>) {
      return {
        ...state,
        isPlaying: action.payload,
      };
    },
  },
});

export const { updateNowPlaying, togglePlayPause } = nowPlayingSlice.actions;
export default nowPlayingSlice.reducer;
