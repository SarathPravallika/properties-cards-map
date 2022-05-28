import { createSelector } from "@reduxjs/toolkit";
import { selectFilterData } from "../filters/filters.selectors";
import { selectMapsFeatures } from "../maps/maps.selectors";
import { applyFilters } from "./properties.utils";

const selectProperties = (state) => state.properties;
const selectPropertiesByTypes = createSelector(
  [selectProperties],
  (properties) => properties.byTypes
);
const selectActiveTabIndex = createSelector(
  [selectProperties],
  (properties) => properties.activeTabIndex
);
const selectFilteredData = createSelector(
  [selectFilterData, selectMapsFeatures, selectPropertiesByTypes],
  (
    {
      searchText,
      savedFilters: {
        bedrooms: filteredBedrooms,
        bathrooms: filteredBathrooms,
        sleeps: filteredSleeps,
        reviews: filteredReviews,
      },
    },
    features,
    byTypes
  ) => {
    return applyFilters(
      {
        searchText,
        filteredBedrooms,
        filteredBathrooms,
        filteredSleeps,
        filteredReviews,
      },
      { features, byTypes }
    );
  }
);

export { selectFilteredData, selectActiveTabIndex };
