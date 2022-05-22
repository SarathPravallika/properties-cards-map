import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  REACT_APP_MAX_FILTER_COUNT,
  REACT_APP_MIN_FILTER_COUNT,
} from "../../../../constants";

interface FiltersState {
  searchText: string;
  minValue: number;
  maxValue: number;
  bedrooms: { minValue: number; maxValue: number };
  bathrooms: { minValue: number; maxValue: number };
  sleeps: { minValue: number; maxValue: number };
  reviews: Array<boolean>;
  savedFilters: {
    bedrooms: { minValue: number; maxValue: number };
    bathrooms: { minValue: number; maxValue: number };
    sleeps: { minValue: number; maxValue: number };
    reviews: Array<boolean>;
  };
}

const minValue = REACT_APP_MIN_FILTER_COUNT;
const maxValue = REACT_APP_MAX_FILTER_COUNT;

const initialState: FiltersState = {
  searchText: "",
  minValue,
  maxValue,
  bedrooms: { minValue, maxValue },
  bathrooms: { minValue, maxValue },
  sleeps: { minValue, maxValue },
  reviews: new Array(maxValue + 1).fill(true),
  savedFilters: {
    bedrooms: { minValue, maxValue },
    bathrooms: { minValue, maxValue },
    sleeps: { minValue, maxValue },
    reviews: new Array(maxValue + 1).fill(true),
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    initializeFilterData: () => {
      return initialState;
    },
    resetFilterData: (state) => {
      return { ...initialState, searchText: state.searchText };
    },
    saveFilterData: (state) => {
      const { bedrooms, bathrooms, sleeps, reviews } = state;
      return {
        ...state,
        savedFilters: {
          bedrooms,
          bathrooms,
          sleeps,
          reviews,
        },
      };
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setReviews: (state, action: PayloadAction<number>) => {
      state.reviews[action.payload] = !state.reviews[action.payload];
    },
    setCountFilters: (
      state,
      action: PayloadAction<{ type: string; key: string; value: number }>
    ) => {
      const { type, key, value } = action.payload;
      // @ts-ignore
      state[type][key] = value;
    },
  },
});

export const {
  initializeFilterData,
  resetFilterData,
  saveFilterData,
  setSearchText,
  setReviews,
  setCountFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
