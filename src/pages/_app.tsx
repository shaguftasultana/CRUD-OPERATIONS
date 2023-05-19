import "../styles/globals.css";
import { useReducer } from "react";
import { MyContext, initialState, reducer } from "../components/MyContext";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppProps } from "../Interfaces";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

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

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "/api/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <MyContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </MyContext.Provider>
    </ApolloProvider>
  );
}
