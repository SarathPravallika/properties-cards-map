import React, { Fragment, FC, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { capitalizeFirstLetter } from "../../utilities";

const CloseFilters = styled(CloseIcon)`
  position: absolute;
  right: 1rem;
  height: 1rem;
`;

const RatingEntry = styled("div")`
  display: flex;
  align-items: center;
`;

const FilterName = styled("div")`
  font-weight: bold;
  padding-bottom: 0.5rem;
`;

const RatingLabel = styled("div")`
  font-size: small;
  padding-left: 0.25rem;
`;

interface RatingFilterProps {
  children?: ReactNode;
  name: string;
  max: number;
  values: Array<boolean>;
  handleChange: (index: number) => void;
}

const RatingFilter: FC<RatingFilterProps> = ({
  name,
  max,
  values,
  handleChange,
}) => {
  const onCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    event.stopPropagation();
    handleChange(index);
  };

  return (
    <Box sx={{ paddingBottom: "1rem" }}>
      <FilterName>{capitalizeFirstLetter(name)}</FilterName>
      <Fragment>
        {[...Array(max), max].map((item, index) => (
          <RatingEntry key={index}>
            <Checkbox
              sx={{ paddingLeft: 0 }}
              checked={values[max - index]}
              onChange={(e) => onCheckboxClick(e, max - index)}
            />
            <Rating
              sx={{ color: "#2f3f4e" }}
              name="half-rating-read"
              defaultValue={max - index}
              readOnly
            />
            <RatingLabel>{max - index}+ stars</RatingLabel>
          </RatingEntry>
        ))}
      </Fragment>
    </Box>
  );
};

export default RatingFilter;
