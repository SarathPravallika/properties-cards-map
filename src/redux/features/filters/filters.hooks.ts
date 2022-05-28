import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../rootReducer";
import {
  selectFiltersBathrooms,
  selectFiltersBedrooms,
  selectFiltersMaxValue,
  selectFiltersMinValue,
  selectFiltersReviews,
  selectFiltersSavedFilters,
  selectFiltersSearchText,
  selectFiltersSleeps,
} from "./filters.selectors";

const useFilters = () => {
  const searchText = useSelector(selectFiltersSearchText);
  const savedFilters = useSelector(selectFiltersSavedFilters);
  const minValue = useSelector(selectFiltersMinValue);
  const maxValue = useSelector(selectFiltersMaxValue);
  const bedrooms = useSelector(selectFiltersBedrooms);
  const bathrooms = useSelector(selectFiltersBathrooms);
  const sleeps = useSelector(selectFiltersSleeps);
  const reviews = useSelector(selectFiltersReviews);

  return {
    searchText,
    minValue,
    maxValue,
    bedrooms,
    bathrooms,
    sleeps,
    reviews,
    savedFilters,
  };
};

export default useFilters;
