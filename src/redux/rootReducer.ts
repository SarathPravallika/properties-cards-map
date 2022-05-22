import { combineReducers } from "redux";
import propertiesReducer from "./features/properties/properties.slice";
import filtersReducer from "./features/filters/filters.slice";
import mapsReducer from "./features/maps/maps.slice";

const rootReducer = combineReducers({
  properties: propertiesReducer,
  filters: filtersReducer,
  maps: mapsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
