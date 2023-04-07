//import '@/styles/globals.css'
import "@/styles/globals.css";
import axios from "axios";
import { useEffect, useReducer , useState } from "react";
import { MyContext, initialState, reducer } from "../components/MyContext";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0070f3",
    },
    secondary: {
      main: "#dddddd",
    },
    warning: {
      main: "#c90d11",
    },
    success: {
      main: "#2cc50f",
    },
    black:{
      main:"#000",
    },
  },
});


export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/api/v2");
      const { data } = res;
      
      dispatch({ type: "ADD_DATA", payload: data.data });
    };
      getData(); 
  }, []);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </ThemeProvider>
    </MyContext.Provider>
  );
}
