import { createSlice } from "@reduxjs/toolkit";

interface MapsState {
  initialViewState: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  selectedProperty: any;
  features: any;
}

const initialState: MapsState = {
  initialViewState: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 12.5,
  },
  selectedProperty: null,
  features: {},
};

export const mapsSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    resetMapsData: (state) => {
      return initialState;
    },
    selectProperty: (state, action) => {
      state.selectedProperty = action.payload;
      return state;
    },
    setFeatures: (state, action) => {
      state.features = action.payload;
      return state;
    },
  },
});

export const { resetMapsData, selectProperty, setFeatures } = mapsSlice.actions;

export default mapsSlice.reducer;
