import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Filtering {
  stringFilter: string;
  keyFilter?: string;
  semitoneFilter?: '1' | '2' | '3';
  BPM_Range?: { start: number; end: number };
}

const initialState: Filtering = {
  stringFilter: '',
};

export const AudioFiltering = createSlice({
  name: 'AudioFiltering',
  initialState,
  reducers: {
    updateStringFilter(state: Filtering, action: PayloadAction<Filtering>) {
      state.stringFilter = action.payload.stringFilter;
    },
  },
});

export const { updateStringFilter } = AudioFiltering.actions;
export default AudioFiltering.reducer;
