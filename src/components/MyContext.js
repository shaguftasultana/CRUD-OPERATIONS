import React, { createContext } from "react";

const initialState = {
  show: "",
  allData: [],
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
    // case "UPADATE_DATA":
    //   const data = [state.allData, action.payload]

    //   return {
    //     ...state,
    //     allData: data,
    //   };

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
      console.log(action.payload);
      const filteredData = state.allData.filter(
        (data) => data._id !== action.payload
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
