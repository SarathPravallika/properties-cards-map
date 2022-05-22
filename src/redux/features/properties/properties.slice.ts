import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { GenericObject, PropertiesState, Property } from "./properties.types";

const initialState: PropertiesState = {
  byTypes: {},
  activeTabIndex: 0,
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    resetData: (state) => {
      return initialState;
    },
    setActiveTabIndex: (state, action: PayloadAction<number>) => {
      state.activeTabIndex = action.payload;
      return state;
    },
    fillData: (state, action: PayloadAction<{ results: GenericObject }>) => {
      const { results } = action.payload || {};
      const { listings = [] } = results || {};

      listings.forEach((listing: GenericObject) => {
        const {
          propertyId,
          propertyType,
          images = [],
          propertyMetadata: { propertyName, headline } = {
            propertyName: "",
            headline: "",
          },
          bedrooms,
          bathrooms: { full, half, toiletOnly } = {
            full: 0,
            half: 0,
            toiletOnly: 0,
          },
          sleeps,
          averageRating,
          reviewCount,
          geoCode: { latitude, longitude } = { latitude: 0, longitude: 0 },
        } = listing || {};

        const propertyObject: Property = {
          id: propertyId,
          imgURL: images[0]?.c6_uri || images[0]?.c9_uri, // c6_uri is the primary image, c9_uri is the secondary image
          name: propertyName || headline, // Fallback to headline if propertyName is not available
          bedrooms,
          bathrooms: full + half + toiletOnly, // Sum of all bathroom types
          sleeps,
          averageRating,
          reviewCount,
          latitude,
          longitude,
        };

        if (state.byTypes[propertyType]) {
          // If the property type already exists, add the property to the existing array
          state.byTypes[propertyType][propertyId] = propertyObject;
        } else {
          // Else create a new property type and add the property to it
          state.byTypes[propertyType] = {
            [propertyId]: propertyObject,
          };
        }
      });
    },
  },
});

const getData = createAction("GET_DATA");

export { getData };
export const { resetData, fillData, setActiveTabIndex } =
  propertiesSlice.actions;

export default propertiesSlice.reducer;
