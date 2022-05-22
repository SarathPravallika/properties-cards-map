import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../rootReducer";
import { setSearchText } from "./filters.slice";

const useFilters = () => {
  const {
    searchText,
    minValue,
    maxValue,
    bedrooms,
    bathrooms,
    sleeps,
    reviews,
    savedFilters,
  } = useSelector((state: RootState) => state.filters);
  const dispath = useDispatch();

  const updateSearchText = (searchText: string) =>
    dispath(setSearchText(searchText));

  return {
    searchText,
    minValue,
    maxValue,
    bedrooms,
    bathrooms,
    sleeps,
    reviews,
    updateSearchText,
    savedFilters,
  };
};

export default useFilters;
