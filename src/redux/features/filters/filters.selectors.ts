import { createSelector } from "@reduxjs/toolkit";

const selectFilters = (state) => state.filters;

const selectFiltersSearchText = createSelector(
  [selectFilters],
  (filters) => filters.searchText
);
const selectFiltersSavedFilters = createSelector(
  [selectFilters],
  (filters) => filters.savedFilters
);
const selectFiltersMinValue = createSelector(
  [selectFilters],
  (filters) => filters.minValue
);
const selectFiltersMaxValue = createSelector(
  [selectFilters],
  (filters) => filters.maxValue
);
const selectFiltersBedrooms = createSelector(
  [selectFilters],
  (filters) => filters.bedrooms
);
const selectFiltersBathrooms = createSelector(
  [selectFilters],
  (filters) => filters.bathrooms
);
const selectFiltersSleeps = createSelector(
  [selectFilters],
  (filters) => filters.sleeps
);
const selectFiltersReviews = createSelector(
  [selectFilters],
  (filters) => filters.reviews
);

const selectFilterData = createSelector(
  [selectFiltersSearchText, selectFiltersSavedFilters],
  (searchText, savedFilters) => ({ searchText, savedFilters })
);

const selectComponentData = createSelector(
  [
    selectFiltersSearchText,
    selectFiltersSavedFilters,
    selectFiltersMinValue,
    selectFiltersMaxValue,
    selectFiltersBedrooms,
    selectFiltersBathrooms,
    selectFiltersSleeps,
    selectFiltersReviews,
  ],
  (
    searchText,
    savedFilters,
    minValue,
    maxValue,
    bedrooms,
    bathrooms,
    sleeps,
    reviews
  ) => ({
    searchText,
    savedFilters,
    minValue,
    maxValue,
    bedrooms,
    bathrooms,
    sleeps,
    reviews,
  })
);

export {
  selectFiltersSearchText,
  selectFiltersSavedFilters,
  selectFiltersMinValue,
  selectFiltersMaxValue,
  selectFiltersBedrooms,
  selectFiltersBathrooms,
  selectFiltersSleeps,
  selectFiltersReviews,
  selectFilterData,
};
