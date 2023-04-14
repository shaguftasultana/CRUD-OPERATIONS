import React, { createContext } from "react";
import { array } from "yup";

const initialState = {
  show: "",
  allData: [],
  allLocations: [],
};
const MyContext = createContext(initialState);

const reducer = (state, action) => {
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
      const updatedIndex = state.allData.findIndex(
        (data) => data.id === updatedData.id
      );
      const newData = [...state.allData];
      newData[updatedIndex] = updatedData;
      return {
        ...state,
        allData: newData,
      };
    case "REMOVE_DATA":
      const filteredData = state.allData.filter(
        (data) => data._id !== action.payload
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
        (data) => data._id !== action.payload
      );
      return {
        ...state,
        allLocations: locationData,
      };
    case "EDIT_LOCATION":
      return {
        ...state,
        dataToEdit: action.payload,
      };

    default:
      return state;
  }
};
export { reducer, MyContext, initialState };
