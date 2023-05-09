interface FormData {
  _id?: string;
  productname: string;
  description: string;
  price: number;
  manufacturedDate: string;
  expiryDate: string;
  image: string;
  category: string;
  dropdown: number;
  checkbox: string;
}
interface InitialStateInterface {
  show: string;
  allData: [];
  allLocations: [];
  dataToEdit?: any;
}

interface ActionInterface {
  type: string;
  payload: any;
}
interface CoordinatesType {
  center: string[] | number[];
  zoom: number;
}
interface LatLngCoordinatesType {
  lat: number;
  lng: number;
  address?: string;
}
interface FeaturesType {
  place_name: string;
  center: number[];
}
interface AppProps {
  Component: any;
  pageProps: any;
}

export type {
  FormData,
  InitialStateInterface,
  ActionInterface,
  CoordinatesType,
  LatLngCoordinatesType,
  FeaturesType,
  AppProps,
};
