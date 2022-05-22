import React, { createRef, FC, ReactNode, useContext } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import PropertyCard from "../PropertyCard";
import "./TabPanelContent.css";
import useProperties from "../../redux/features/properties/properties.hooks";
import PageContext from "../../redux/pageContext";
import { selectProperty } from "../../redux/features/maps/maps.slice";
import { REACT_APP_PAGINATION_COUNT } from "../../../constants";

const TabPanelContentContainer = styled(Box)`
  height: 100%;
  padding: 0;
`;

const TabPanelContentBody = styled(Box)`
  height: calc(100% - 4rem);
  padding-top: 0.5rem;
  overflow-y: auto;
`;

const TabPanelContentHeader = styled("div")`
  height: 2rem;
  font-size: small;
  padding-left: 0.5rem;
`;

const TabPanelContentFooter = styled("div")`
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: small;
`;

interface TabPanelContentProps {
  children?: ReactNode;
  propertyType: string;
}

const TabPanelContent: FC<TabPanelContentProps> = ({ propertyType }) => {
  const dispatch = useDispatch();
  const { getListingsByPropertyType } = useProperties();
  const { refs } = useContext(PageContext);
  const data = getListingsByPropertyType(propertyType);

  const count = Object.keys(data).length;
  const [checked, setChecked] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginationCount = REACT_APP_PAGINATION_COUNT;
  const totalPages = Math.ceil(count / paginationCount);

  return (
    <TabPanelContentContainer className="tab-panel-content">
      <TabPanelContentHeader>
        {Object.keys(data).length ? (
          <FormControlLabel
            className="form-control-label"
            control={
              <Checkbox
                checked={checked}
                size="small"
                onChange={handleChange}
                inputProps={{ "aria-label": "Select all properties" }}
              />
            }
            label="Select all properties"
          />
        ) : null}
      </TabPanelContentHeader>
      <TabPanelContentBody>
        {Object.values(data).map((property) => {
          const {
            id,
            imgURL,
            name,
            averageRating,
            reviewCount,
            bedrooms,
            bathrooms,
            sleeps,
          } = property;
          let newRef = createRef<HTMLDivElement>();
          // @ts-ignore
          refs[id] = newRef;
          return (
            <div
              style={{ cursor: "pointer" }}
              key={id}
              ref={newRef}
              onClick={() => dispatch(selectProperty(property))}
            >
              <PropertyCard
                id={id}
                name={name}
                info={`${bedrooms} br . ${bathrooms} ba . Sleeps ${sleeps}`}
                img={imgURL}
                rating={averageRating}
                ratingCount={reviewCount}
                checked={false}
                matchPercentage={80}
              />
            </div>
          );
        })}
      </TabPanelContentBody>
      <TabPanelContentFooter>
        {count ? (
          <>
            <Typography sx={{ fontSize: "small" }}>
              {`Viewing ${(page - 1) * paginationCount + 1} - ${
                page * paginationCount > count ? count : page * paginationCount
              } of ${count} properties`}
            </Typography>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                siblingCount={0}
                boundaryCount={0}
              />
            </Stack>
          </>
        ) : null}
      </TabPanelContentFooter>
    </TabPanelContentContainer>
  );
};

export default TabPanelContent;
