import React, { createContext } from "react";
import { array } from "yup";

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

const initialState: InitialStateInterface = {
  show: "",
  allData: [],
  allLocations: [],
};
const MyContext = createContext<{
  state: InitialStateInterface;
  dispatch: React.Dispatch<ActionInterface>;
}>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: InitialStateInterface, action: ActionInterface) => {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        show: action.payload,
      };
    case "ADD_DATA":
      return {
        ...state,
        allData: action.payload,
      };
    case "EDIT_DATA":
      return {
        ...state,
        dataToEdit: action.payload,
      };

    case "UPADATE_DATA":
      const updatedData = action.payload;
      const prevData = state.allData.filter(
        (data: { _id: any }) => data._id !== updatedData._id
      );
      const newData = [...prevData, updatedData];

      return {
        ...state,
        allData: newData,
      };

    case "ADDNEWSINGLERECORD":
      const newD = [...state.allData, action.payload];
      return {
        ...state,
        allData: newD,
      };

    case "REMOVE_DATA":
      const filteredData = state.allData.filter(
        (data: { _id: any }) => data._id !== action.payload
      );
      return {
        ...state,
        allData: filteredData,
      };
    case "ADD_LOCATION":
      return {
        ...state,
        allLocations: action.payload,
      };
    case "UPDATE_LOCATION":
      return {
        ...state,
        allLocations: [...state.allLocations, action.payload],
      };

    case "DELETE_LOCATION":
      const locationData = state.allLocations.filter(
        (data: { _id: any }) => data._id !== action.payload
      );
      return {
        ...state,
        allLocations: locationData,
      };

    default:
      return state;
  }
};

export { reducer, MyContext, initialState };
