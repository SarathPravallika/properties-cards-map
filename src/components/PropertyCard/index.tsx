import React, { FC } from "react";
import Box from "@mui/material/Box";
import MUICard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import ImageListItem from "@mui/material/ImageListItem";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import "./PropertyCard.css";

interface PropertyCardProps {
  id: string;
  name: string;
  info: string;
  matchPercentage: number;
  checked: boolean;
  img: string;
  rating: number;
  ratingCount: number;
}

const PropertyCardContent = styled(Box)`
  position: relative;
  width: calc(100% - 10.5rem);
  padding-left: 0.5rem;
`;

const RatingLabel = styled("div")`
  font-size: small;
  padding-left: 0.25rem;
`;

const PropertyCardInfo = styled("div")`
  font-size: small;
`;
const PropertyCardTitle = styled("div")`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RatingContent = styled("div")`
  display: flex;
`;

const PropertyCardFooter = styled("div")`
  position: absolute;
  bottom: -0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Card = styled(MUICard)`
  height: 8rem;
  display: flex;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
`;

const PropertyCard: FC<PropertyCardProps> = ({
  id,
  name,
  info,
  matchPercentage,
  img = "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  checked,
  rating,
  ratingCount,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>) => {
    event.stopPropagation();
  };

  const matchPercentageClassName = classNames("match-percentage", {
    "match-percentage--is-high": matchPercentage >= 70,
    "match-percentage--is-medium":
      matchPercentage > 50 && matchPercentage <= 70,
  });

  return (
    <Card aria-label="displays property details">
      <Checkbox
        sx={{ width: "2rem" }}
        checked={checked}
        size="small"
        onChange={handleChange}
        inputProps={{ "aria-label": `Select ${name} property` }}
      />
      <ImageListItem sx={{ width: "8rem" }}>
        <img
          src={`${img}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={name}
          loading="lazy"
          style={{ borderRadius: "1rem" }}
        />
      </ImageListItem>
      <PropertyCardContent sx={{}}>
        <div
          className={matchPercentageClassName}
        >{`${matchPercentage}% Match`}</div>
        <PropertyCardTitle>{name}</PropertyCardTitle>
        <PropertyCardInfo>{info}</PropertyCardInfo>
        <PropertyCardFooter>
          <RatingContent>
            <Rating
              sx={{ color: "#2f3f4e" }}
              size="small"
              defaultValue={rating}
              precision={0.5}
              readOnly
            />
            <RatingLabel>({ratingCount})</RatingLabel>
          </RatingContent>
          <Button variant="text" sx={{ textTransform: "unset" }}>
            Remove
          </Button>
        </PropertyCardFooter>
      </PropertyCardContent>
    </Card>
  );
};

export default PropertyCard;
