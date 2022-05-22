// @ts-ignore
import { booleanPointInPolygon, point, polygon } from "@turf/turf";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const inBetween = (min: number, max: number, value: number) => {
  return value <= max && value >= min;
};

const isPresentInArea = (features, longitude, latitude) => {
  return Object.values(features).some((feature: { geometry }) => {
    const { geometry } = feature;
    const { coordinates } = geometry;

    var pt = point([longitude, latitude]);
    var poly = polygon(coordinates);

    return booleanPointInPolygon(pt, poly);
  });
};

export { capitalizeFirstLetter, inBetween, isPresentInArea };
