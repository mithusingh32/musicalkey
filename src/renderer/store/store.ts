import { configureStore } from '@reduxjs/toolkit';
import NowPlayingReducers from './now-playing/now-playing.slice';
import FetchDataReducers from './audio-data/fetch-data.slice';

const store = configureStore({
  reducer: {
    nowPlaying: NowPlayingReducers,
    audioCollection: FetchDataReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
