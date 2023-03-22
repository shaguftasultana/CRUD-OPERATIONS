import axios from "axios";
import React, { createContext, useReducer } from "react";

const initialState = {
  show: "",
  allData: [],
}
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
        dataToEdit: action.payload ,
      };
    case "UPADATE_DATA":
      return {
        ...state,
        allData: action.payload,
      };
    case "REMOVE_DATA":
      const filteredData = state.allData.filter(
        (data) => data.id !== action.payload
      );
      return {
        ...state,
        allData: filteredData,
      };
     
      
      
    default:
      return state;
  }
};
export { reducer, MyContext, initialState };
