import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Filtering {
  stringFilter: string;
  keyFilter?: string;
  semitoneFilter?: {
    one_semi?: boolean;
    two_semi?: boolean;
  };
  BPM_Range: {
    enable: boolean;
    start?: number | undefined;
    end?: number | undefined;
  };
}

const initialState: Filtering = {
  stringFilter: '',
  keyFilter: 'All',
  BPM_Range: { enable: false },
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
    updateBPMFilter(
      state: Filtering,
      action: PayloadAction<{
        enable: boolean;
        start: number | undefined;
        end: number | undefined;
      }>
    ) {
      if (!action.payload.enable)
        return {
          ...state,
          BPM_Range: {
            enable: action.payload.enable,
            start: undefined,
            end: undefined,
          },
        };
      return {
        ...state,
        BPM_Range: {
          enable: action.payload.enable,
          start: action.payload.start,
          end: action.payload.end,
        },
      };
    },
  },
});

export const {
  updateStringFilter,
  updateKeyFilter,
  updateSemitoneFilter,
  updateBPMFilter,
} = AudioFiltering.actions;
export default AudioFiltering.reducer;
