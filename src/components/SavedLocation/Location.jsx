import { Typography, Grid, Card, Button } from "@mui/material";
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "../MyContext";

const Location = ({ handleEdit }) => {
  const { state, dispatch } = useContext(MyContext);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/api/v3");
      const { data } = res;
      dispatch({
        type: "ADD_LOCATION",
        payload: data.data,
      });
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/v3", {
        data: { id: id },
      });
      dispatch({ type: "DELETE_LOCATION", payload: id });
    } catch (error) {}
  };
  return (
    <>
      <Card sx={{ marginTop: "10%", height: "auto" }}>
        <Typography textAlign="center" fontWeight="bold" fontSize={20} m={1}>
          Our Locations
        </Typography>
        <Grid container sx={{ height: "400px", overflowY: "scroll" }}>
          {state.allLocations.map((location) => (
            <Grid
              item
              xs={12}
              key={location.id}
              sx={{
                borderBottom: "1px solid black",
              }}
            >
              <Typography variant="body1" m={1}>
                {location.address}
              </Typography>
              <Grid item>
                <Button
                  color="success"
                  size="small"
                  onClick={() => handleEdit(location)}
                >
                  EDIT
                </Button>
                <Button
                  color="error"
                  size="small"
                  onClick={() => {
                    handleDelete(location._id);
                  }}
                >
                  DELETE
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default Location;
