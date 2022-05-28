import React, { FC, ReactNode, useState, useCallback } from "react";
import classNames from "classnames";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import PropertiesDetailsHeader from "../PropertiesDetailsHeader";
import PropertiesFilters from "../PropertiesFilters";
import "./PropertiesOverlay.css";
import PropertiesDetailsBody from "../PropertiesDetailsBody";
import useFilters from "../../redux/features/filters/filters.hooks";
import { useDispatch, useSelector } from "react-redux";
import { selectFiltersSearchText } from "../../redux/features/filters/filters.selectors";
import { setSearchText } from "../../redux/features/filters/filters.slice";

const PropertiesDetails = styled(Box)`
  padding: 0.5rem;
  padding-right: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
`;

const PropertiesOverlayBox = styled(Box)`
  display: flex;
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 30%;
  height: 100%;
  transform: translateX(0);
  transition-property: transform, opacity;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  z-index: 3;
  background-color: white;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
`;

interface PropertiesOverlayProps {
  children?: ReactNode;
}

const PropertiesOverlay: FC<PropertiesOverlayProps> = ({}) => {
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = useCallback(
    () => setShowFilters(!showFilters),
    [showFilters]
  );

  const dispatch = useDispatch();
  const searchText = useSelector(selectFiltersSearchText);
  const updateSearchText = useCallback(
    (searchText: string) => dispatch(setSearchText(searchText)),
    [dispatch, setSearchText]
  );

  const className = classNames("properties-overlay", {
    "properties-overlay--has-filters": showFilters,
  });

  return (
    <PropertiesOverlayBox className={className}>
      <PropertiesDetails className="properties-details">
        <PropertiesDetailsHeader
          searchText={searchText}
          handleInputChange={(e) => updateSearchText(e.target.value)}
          toggleFilters={toggleFilters}
        />
        <PropertiesDetailsBody />
      </PropertiesDetails>
      {showFilters && <PropertiesFilters onClose={toggleFilters} />}
    </PropertiesOverlayBox>
  );
};

export default PropertiesOverlay;
