import React, { createContext, useReducer } from "react";

const initialState = {
show:"",
allData:[]
};

 const MyContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        show :action.payload
      };
    case "ADD_DATA":
      return {
        ...state,
        allData: action.payload,
      };
  
    default:
      return state;
  }
};
export {reducer , MyContext , initialState}


