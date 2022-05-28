import React, { FC, ReactNode, memo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { capitalizeFirstLetter } from "../../utilities";
import CountFilterEntry from "../CountFilterEntry";

const CloseFilters = styled(CloseIcon)`
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

const FilterName = styled("div")`
  font-weight: bold;
  padding-bottom: 0.5rem;
`;

const Filters = styled("section")`
  height: calc(100% - 2rem);
`;

interface CountFilterProps {
  children?: ReactNode;
  boundaryValues: Array<number>;
  name: string;
  minValue: number;
  maxValue: number;
}

const CountFilter: FC<CountFilterProps> = ({
  name,
  boundaryValues,
  minValue,
  maxValue,
}) => {
  return (
    <Box sx={{ paddingBottom: "1rem" }}>
      <FilterName>{capitalizeFirstLetter(name)}</FilterName>
      <CountFilterEntry
        name={name}
        identifier="minValue"
        label={`Min ${name}`}
        value={minValue}
        minValue={boundaryValues[0]}
        maxValue={maxValue}
      />
      <CountFilterEntry
        name={name}
        identifier="maxValue"
        label={`Max ${name}`}
        value={maxValue}
        minValue={minValue}
        maxValue={boundaryValues[1]}
      />
    </Box>
  );
};

export default memo(CountFilter);
