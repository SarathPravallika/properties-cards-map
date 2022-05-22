import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";

const useMaps = () => {
  const { initialViewState, selectedProperty, features } = useSelector(
    (state: RootState) => state.maps
  );

  return {
    initialViewState,
    selectedProperty,
    features,
  };
};

export default useMaps;
