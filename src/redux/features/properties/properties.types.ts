export interface Property {
  id: string;
  imgURL: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  averageRating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
}

export interface PropertiesState {
  byTypes: { [key: string]: { [key: string]: Property } };
  activeTabIndex: number;
}

export interface GenericObject {
  [key: string]: any;
}
