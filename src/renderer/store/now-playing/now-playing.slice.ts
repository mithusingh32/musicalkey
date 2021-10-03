import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioData } from '../../interfaces/audio.interface';

export interface NowPlaying {
  audioTrack?: AudioData;
  isPlaying: boolean;
  isLoaded: 'not-loaded' | 'loading' | 'error' | 'loaded';
}

const initialState: NowPlaying = {
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
      // TODO: Verify if we need this check at all
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
        isLoaded: action.payload.isLoaded,
      };
    },
    togglePlayPause(state: NowPlaying, action?: PayloadAction<boolean>) {
      if (action) {
        return {
          ...state,
          isPlaying: action.payload,
        };
      }
      if (state.isLoaded === 'loaded') {
        return {
          ...state,
          isPlaying: !state.isPlaying,
        };
      }
      return {
        ...state,
      };
    },
  },
});

export const { updateNowPlaying, togglePlayPause } = nowPlayingSlice.actions;
export default nowPlayingSlice.reducer;
