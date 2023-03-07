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
      case "EDIT_DATA":
  const { id, productname, description, price, manufacturedDate, expiryDate, category } = action.payload;
  const dataToEdit = state.allData.find(data => data.id === id);
  return {
    ...state,
    show: "edit",
    dataToEdit: {
      ...dataToEdit,
      productname: productname || dataToEdit.productname,
      description: description || dataToEdit.description,
      price: price || dataToEdit.price,
      manufacturedDate: manufacturedDate || dataToEdit.manufacturedDate,
      expiryDate: expiryDate || dataToEdit.expiryDate,
      category: category || dataToEdit.category
    }
  };

      
  
    default:
      return state;
  }
};
export {reducer , MyContext , initialState}


