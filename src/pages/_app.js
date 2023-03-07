//import '@/styles/globals.css'
import "@/styles/globals.css";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { MyContext, initialState, reducer } from "./components/MyContext";

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/api/FormData/");
      const {data}=res
      dispatch({type: "ADD_DATA", payload:data.data[0]})
    };
    getData();
  }, []);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </MyContext.Provider>
  );
}
