import React, { FC, ReactNode } from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { setCountFilters } from "../../redux/features/filters/filters.slice";

const FilterValue = styled("div")`
  font-weight: bold;
  color: "#2f3f4e";
`;

const FilterLabel = styled("div")`
  font-size: small;
`;

const Actions = styled("div")`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  padding-right: 1rem;
`;

interface CountFilterEntryProps {
  children?: ReactNode;
  name: string;
  label: string;
  identifier: string;
  value: number;
  minValue: number;
  maxValue: number;
}

const CountFilterEntry: FC<CountFilterEntryProps> = ({
  name,
  value,
  label,
  identifier,
  minValue,
  maxValue,
}) => {
  const dispatch = useDispatch();
  return (
    <Box className="center" sx={{ gap: "1.5rem" }}>
      <FilterValue>{value}</FilterValue>
      <Box className="center" sx={{ width: "100%" }}>
        <FilterLabel>{label}</FilterLabel>
        <Actions>
          <IconButton
            aria-label="decrease quantity"
            onClick={() =>
              dispatch(
                setCountFilters({
                  type: name,
                  key: identifier,
                  value: value - 1,
                })
              )
            }
            disabled={
              identifier === "minValue"
                ? value === minValue
                : value === minValue + 1
            }
          >
            <RemoveIcon />
          </IconButton>
          <IconButton
            aria-label="increase quantity"
            onClick={() =>
              dispatch(
                setCountFilters({
                  type: name,
                  key: identifier,
                  value: value + 1,
                })
              )
            }
            disabled={
              identifier === "minValue"
                ? value + 1 === maxValue
                : value === maxValue
            }
          >
            <AddIcon />
          </IconButton>
        </Actions>
      </Box>
    </Box>
  );
};

export default CountFilterEntry;
