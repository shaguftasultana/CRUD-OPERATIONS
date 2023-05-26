interface FormDataInterface {
  _id?: string;
  productname: string;
  description: string;
  price: string;
  manufacturedDate: string;
  expiryDate: string;
  image: string;
  category: string;
  dropdown: string;
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
  FormDataInterface,
  InitialStateInterface,
  ActionInterface,
  CoordinatesType,
  LatLngCoordinatesType,
  FeaturesType,
  AppProps,
};
