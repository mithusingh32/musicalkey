import { configureStore } from '@reduxjs/toolkit';
import NowPlayingReducers from './now-playing/now-playing.slice';
import FetchDataReducers from './audio-data/fetch-data.slice';
import AudioFilteringReducer from './audio-data/filter.slice';

const store = configureStore({
  reducer: {
    nowPlaying: NowPlayingReducers,
    audioCollection: FetchDataReducers,
    audioFiltering: AudioFilteringReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
