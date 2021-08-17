import { configureStore } from '@reduxjs/toolkit';
import NowPlayingReducers from './now-playing/now-playing.slice';

const store = configureStore({
  reducer: {
    nowPlaying: NowPlayingReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
