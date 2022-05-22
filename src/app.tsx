import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import PropertiesOverlay from "./components/PropertiesOverlay";
import { RootState } from "./redux/rootReducer";
import { getData } from "./redux/features/properties/properties.slice";
import GLMap from "./components/GLMap";
import PageContext from "./redux/pageContext";
import { store } from "./redux/store";
import "./App.css";

function App() {
  const [refs, setRefs] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);
  const pageContextData = {
    refs,
    setRefs,
  };

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <div id="app">
        <PageContext.Provider value={pageContextData}>
          <PropertiesOverlay />
          <GLMap />
        </PageContext.Provider>
      </div>
    </StyledEngineProvider>
  );
}

export function renderToDom(container) {
  createRoot(container).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
