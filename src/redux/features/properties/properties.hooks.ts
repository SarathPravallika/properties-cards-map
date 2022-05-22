import { useEffect } from "react";
import { useSelector } from "react-redux";
import { inBetween, isPresentInArea } from "../../../utilities";
import { RootState } from "../../rootReducer";
import useFilters from "../filters/filters.hooks";
import useMaps from "../maps/maps.hooks";
import { Property } from "./properties.types";

const useProperties = () => {
  const { byTypes, activeTabIndex } = useSelector(
    (state: RootState) => state.properties
  );
  const { searchText, savedFilters } = useFilters();
  const { features } = useMaps();

  let filteredData: { [key: string]: { [key: string]: Property } } = {};

  function applyFilters() {
    const {
      bedrooms: filteredBedrooms,
      bathrooms: filteredBathrooms,
      sleeps: filteredSleeps,
      reviews: filteredReviews,
    } = savedFilters;
    filteredData = {};
    Object.keys(byTypes).forEach((key) => {
      const listings = byTypes[key];

      filteredData[key] = Object.keys(listings).reduce(
        (acc: any, listingId) => {
          const {
            name,
            id,
            bedrooms,
            bathrooms,
            sleeps,
            averageRating,
            latitude,
            longitude,
          } = listings[listingId];

          let insertEntry = false;
          if (
            (searchText
              ? [name.toLocaleLowerCase(), id].find((str) =>
                  str.includes(searchText)
                )
              : !searchText) &&
            inBetween(
              filteredBedrooms.minValue,
              filteredBedrooms.maxValue,
              bedrooms
            ) &&
            inBetween(
              filteredBathrooms.minValue,
              filteredBathrooms.maxValue,
              bathrooms
            ) &&
            inBetween(
              filteredSleeps.minValue,
              filteredSleeps.maxValue,
              sleeps
            ) &&
            filteredReviews[Math.ceil(averageRating)] &&
            (Object.keys(features).length
              ? isPresentInArea(features, longitude, latitude)
              : true)
          )
            insertEntry = true;

          if (insertEntry) acc[listingId] = listings[listingId];
          return acc;
        },
        {}
      );
    });
  }

  applyFilters();

  const propertyTypes = Object.keys(filteredData).map((key) => ({
    name: key,
    count: Object.keys(filteredData[key]).length,
  }));

  const getListingsByPropertyType = (propertyType: string) =>
    filteredData[propertyType];

  return {
    propertyTypes,
    getListingsByPropertyType,
    filteredData,
    activeTabIndex,
  };
};

export default useProperties;
