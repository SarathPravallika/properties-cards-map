import React, { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import Map, { Marker, Popup } from "react-map-gl";
import { mapboxAccessToken, mapboxStyle } from "../../lib/mapgl";
import useMaps from "../../redux/features/maps/maps.hooks";
import useProperties from "../../redux/features/properties/properties.hooks";
import { Property } from "../../redux/features/properties/properties.types";
import {
  selectProperty,
  setFeatures,
} from "../../redux/features/maps/maps.slice";
import ImageListItem from "@mui/material/ImageListItem";
import PageContext from "../../redux/pageContext";
import DrawControl from "../Map/draw-control";
import Pin from "../Pin";

function GLMap() {
  const { features } = useMaps();
  const dispatch = useDispatch();

  const onUpdate = useCallback((e) => {
    const newFeatures = { ...features };
    for (const f of e.features) {
      newFeatures[f.id] = f;
    }
    dispatch(setFeatures(newFeatures));
  }, []);

  const onDelete = useCallback((e) => {
    const newFeatures = { ...features };
    for (const f of e.features) {
      delete newFeatures[f.id];
    }
    dispatch(setFeatures(newFeatures));
  }, []);

  const { initialViewState, selectedProperty } = useMaps();
  const { propertyTypes, activeTabIndex, getListingsByPropertyType } =
    useProperties();
  const { refs } = useContext(PageContext);

  const propertyCategory = propertyTypes[activeTabIndex]?.name;
  const data = getListingsByPropertyType(propertyCategory) || {};

  const pins: JSX.Element[] = [];
  Object.values(data)?.forEach((property: Property, index) => {
    pins.push(
      <Marker
        key={`marker-${index}`}
        longitude={property.longitude}
        latitude={property.latitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          dispatch(selectProperty(property));
          onMarkerClick(property);
        }}
      >
        <Pin />
      </Marker>
    );
  });

  const onMarkerClick = (hit: any) => {
    // @ts-ignore
    if (refs[hit.id]?.current) {
      setTimeout(() => {
        // @ts-ignore
        refs[hit.id].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 0);
    }
  };

  return (
    <Map
      initialViewState={initialViewState}
      mapStyle={mapboxStyle}
      mapboxAccessToken={mapboxAccessToken}
    >
      {pins}
      {selectedProperty && (
        <Popup
          anchor="top"
          longitude={Number(selectedProperty.longitude)}
          latitude={Number(selectedProperty.latitude)}
          onClose={() => dispatch(selectProperty(null))}
        >
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <ImageListItem sx={{ width: "6rem" }}>
              <img
                src={`${selectedProperty.imgURL}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${selectedProperty.imgURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={selectedProperty.name}
                loading="lazy"
                style={{ borderRadius: "0.5rem" }}
              />
            </ImageListItem>
            <div>
              <div>{selectedProperty.name}</div>
              <div>{selectedProperty.id}</div>
            </div>
          </div>
        </Popup>
      )}
      <DrawControl
        position="top-left"
        displayControlsDefault={false}
        controls={{
          polygon: true,
          trash: true,
        }}
        defaultMode="draw_polygon"
        onCreate={onUpdate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </Map>
  );
}

export default GLMap;
