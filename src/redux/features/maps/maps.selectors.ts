import { createSelector } from "@reduxjs/toolkit";

const selectMaps = (state) => state.maps;
const selectMapsFeatures = createSelector(
  [selectMaps],
  (maps) => maps.features
);

export { selectMapsFeatures };
