import React, { FC, ReactNode } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const PropertiesDetailsHeaderBox = styled(Box)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 3.5rem;
  padding-right: 0.5rem;
`;

const ActionButton = styled(Button)`
  border-radius: 1rem;
  border: 1px solid #1976d2;
  text-transform: unset;
  height: 2rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

interface PropertiesDetailsHeaderProps {
  children?: ReactNode;
  searchText: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFilters: () => void;
}

const PropertiesDetailsHeader: FC<PropertiesDetailsHeaderProps> = ({
  searchText,
  handleInputChange,
  toggleFilters,
}) => {
  return (
    <PropertiesDetailsHeaderBox>
      <TextField
        sx={{ width: "calc(100% - 6rem)" }}
        className="search-input"
        placeholder="Search by property ID or title"
        value={searchText}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <ActionButton
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={toggleFilters}
      >
        Filters
      </ActionButton>
    </PropertiesDetailsHeaderBox>
  );
};

export default PropertiesDetailsHeader;
