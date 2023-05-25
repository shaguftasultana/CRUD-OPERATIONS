import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { MyContext } from "../components/MyContext";
import { LOCATION_DATA, PRODUCT_DATA } from "../constrain/Query";

// Custom hook to fetch data and manage the context
export const useDataFetching = () => {
  const { state, dispatch } = useContext(MyContext);
  const { data, loading, error } = useQuery(PRODUCT_DATA);

  // Update the context when the data is available
  useEffect(() => {
    if (data) {
      dispatch({ type: "ADD_DATA", payload: data.products });
    }
  }, [data]);

  return { state, loading, dispatch };
};
export const useLocationFetching = () => {
  const { state, dispatch } = useContext(MyContext);
  const { data, loading, error } = useQuery(LOCATION_DATA);
  useEffect(() => {
    if (data) {
      dispatch({ type: "ADD_LOCATION", payload: data.locations });
    }
  }, [data]);
  return { state, loading, dispatch };
};
