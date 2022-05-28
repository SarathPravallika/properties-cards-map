import { inBetween, isPresentInArea } from "../../../utilities";

function applyFilters(
  {
    searchText,
    filteredBedrooms,
    filteredBathrooms,
    filteredSleeps,
    filteredReviews,
  },
  { features, byTypes }
) {
  const filteredData = {};

  Object.keys(byTypes).forEach((key) => {
    const listings = byTypes[key];

    filteredData[key] = Object.keys(listings).reduce((acc: any, listingId) => {
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
        inBetween(filteredSleeps.minValue, filteredSleeps.maxValue, sleeps) &&
        filteredReviews[Math.ceil(averageRating)] &&
        (Object.keys(features).length
          ? isPresentInArea(features, longitude, latitude)
          : true)
      )
        insertEntry = true;

      if (insertEntry) acc[listingId] = listings[listingId];
      return acc;
    }, {});
  });

  console.log(
    "Returning filter data",
    searchText,
    filteredBathrooms,
    filteredBedrooms,
    filteredSleeps,
    filteredReviews
  );
  return filteredData;
}

export { applyFilters };
