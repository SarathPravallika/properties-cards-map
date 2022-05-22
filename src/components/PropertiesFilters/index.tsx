import React, { FC, ReactNode } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import CountFilter from "../CountFilter";
import RatingFilter from "../RatingFilter";
import useFilters from "../../redux/features/filters/filters.hooks";
import {
  resetFilterData,
  setReviews,
  saveFilterData,
} from "../../redux/features/filters/filters.slice";
import "./PropertiesFilters.css";

const CloseFilters = styled(IconButton)`
  position: absolute;
  right: 1rem;
  height: 1rem;
`;

const ActionButton = styled(Button)`
  border-radius: 1rem;
  text-transform: unset;
  height: 2rem;
  margin-left: 0.5rem;
`;

const Actions = styled("div")`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  padding-right: 1rem;
`;

const Filters = styled("section")`
  height: calc(100% - 2rem);
  overflow-y: auto;
  padding-top: 1rem;
`;

interface PropertiesFiltersProps {
  children?: ReactNode;
  onClose: () => void;
}

const PropertiesFilters: FC<PropertiesFiltersProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { minValue, maxValue, bedrooms, bathrooms, sleeps, reviews } =
    useFilters();
  const handleRatingChange = (index: number) => {
    dispatch(setReviews(index));
  };

  const handleReset = () => dispatch(resetFilterData());
  const handleApply = () => dispatch(saveFilterData());

  return (
    <Container className="properties-filters">
      <Box sx={{ height: "100%" }}>
        <CloseFilters aria-label="close filters" onClick={onClose}>
          <CloseIcon />
        </CloseFilters>
        <Filters>
          <CountFilter
            name="bedrooms"
            boundaryValues={[minValue, maxValue]}
            minValue={bedrooms.minValue}
            maxValue={bedrooms.maxValue}
          />
          <CountFilter
            name="bathrooms"
            boundaryValues={[minValue, maxValue]}
            minValue={bathrooms.minValue}
            maxValue={bathrooms.maxValue}
          />
          <CountFilter
            name="sleeps"
            boundaryValues={[minValue, maxValue]}
            minValue={sleeps.minValue}
            maxValue={sleeps.maxValue}
          />
          <RatingFilter
            name="property reviews"
            max={maxValue}
            values={reviews}
            handleChange={handleRatingChange}
          />
        </Filters>
        <Actions>
          <ActionButton variant="outlined" onClick={handleReset}>
            Reset
          </ActionButton>
          <ActionButton variant="contained" onClick={handleApply}>
            Apply
          </ActionButton>
        </Actions>
      </Box>
    </Container>
  );
};

export default PropertiesFilters;
