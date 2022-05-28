import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  selectActiveTabIndex,
  selectFilteredData,
} from "./properties.selectors";
import { Property } from "./properties.types";

const useProperties = () => {
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const filteredData: { [key: string]: { [key: string]: Property } } =
    useSelector(selectFilteredData);

  const getPropertyTypes = useCallback(
    () =>
      Object.keys(filteredData).map((key) => ({
        name: key,
        count: Object.keys(filteredData[key]).length,
      })),
    [filteredData]
  );

  const getListingsByPropertyType = useCallback(
    (propertyType: string) => filteredData[propertyType],
    [filteredData]
  );

  return {
    getPropertyTypes,
    getListingsByPropertyType,
    filteredData,
    activeTabIndex,
  };
};

export default useProperties;
