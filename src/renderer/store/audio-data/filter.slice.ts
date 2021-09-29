import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Filtering {
  stringFilter: string;
  keyFilter?: string;
  semitoneFilter?: {
    one_semi?: boolean;
    two_semi?: boolean;
    three_semi?: boolean;
  };
  BPM_Range?: { start: number; end: number };
}

const initialState: Filtering = {
  stringFilter: '',
  keyFilter: 'All',
};

export const AudioFiltering = createSlice({
  name: 'AudioFiltering',
  initialState,
  reducers: {
    updateStringFilter(state: Filtering, action: PayloadAction<string>) {
      return { ...state, stringFilter: action.payload };
    },
    updateKeyFilter(state: Filtering, action: PayloadAction<string>) {
      return { ...state, keyFilter: action.payload };
    },
    updateSemitoneFilter(
      state: Filtering,
      action: PayloadAction<{
        one_semi?: boolean;
        two_semi?: boolean;
        three_semi?: boolean;
      }>
    ) {
      return {
        ...state,
        semitoneFilter: {
          ...action.payload,
        },
      };
    },
  },
});

export const { updateStringFilter, updateKeyFilter, updateSemitoneFilter } =
  AudioFiltering.actions;
export default AudioFiltering.reducer;
