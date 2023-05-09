import "../styles/globals.css";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { MyContext, initialState, reducer } from "../components/MyContext";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppProps } from "../Interfaces";

const theme: any = createTheme({
  palette: {
    primary: {
      main: "#000",
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
  },
} as any);


export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/api/v2");
      const { data } = res;

      dispatch({ type: "ADD_DATA", payload: data.data });
    };

    if (update) getData();
    setUpdate(true);
  }, [setUpdate]);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </MyContext.Provider>
  );
}
