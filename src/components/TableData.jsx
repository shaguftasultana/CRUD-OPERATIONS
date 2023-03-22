import { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { MyContext } from "./MyContext";
import { useRouter } from "next/router";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import axios from "axios";
import Filter from "./Filter/Filter";

export default function TableData() {
  const router = useRouter();
  const { state, dispatch } = useContext(MyContext);
  console.log(state);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(state.allData);
  }, [state.allData]);

  const handleUpdate = (id) => {
    const shouldUpdate = window.confirm("Are you sure you want to Update?");
    if (shouldUpdate) {
      const selectedRow = state.allData.find((row) => row.id === id);
      dispatch({
        type: "EDIT_DATA",
        payload: selectedRow,
      });
      router.push("/edit");
    }
  };
  const handleAdd = () => {
    const shouldAdd = window.confirm(
      "Are you sure you want to add new record?"
    );
    if (shouldAdd) {
      router.push({
        pathname: "/add",
      });
    }
  };
  const deleteItems = async (str, id) => {
    const form = new FormData();
    form.append("id", id.id);

    try {
      const data = await axios({
        method: "Delete",
        url: str,
        data: form,
      });

      return data;
    } catch (error) {
      throw error.message;
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const shouldDelete = window.confirm("Are you sure you want to delete?");

    if (shouldDelete) {
      await deleteItems("http://localhost:3000/api/v1", {
        id: id,
      });
      dispatch({ type: "REMOVE_DATA", payload: id });
    }
  };

  return (
    <>
      <Grid container>
        <Grid item sx={{ position: "absolute", Top: "0", width: "100%" }}>
          <Header />
        </Grid>
        <Grid container sx={{ marginLeft: "5%", marginTop: "15px" }}>
          <Grid item xs={2} sx={{ marginLeft: "auto", marginTop: "80px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
              disableElevation
              onClick={handleAdd}
            >
              Add New Record
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          display="flex"
          marginLeft={2}
          marginTop={6}
          marginBottom={5}
          padding={2}
        >
          <Grid item xs={3} marginTop="5px">
            <Filter allData={state.allData} setFilterData={setFilterData} />
          </Grid>
          <Grid item xs={9} display="grid" gridTemplateColumns="1fr 1fr 1fr">
            {filterData.length === 0 ? (
              <>
                <Typography marginLeft="80%" padding="20%" fontSize={20}>
                  No Data Found....
                </Typography>
              </>
            ) : (
              filterData.map((row) => (
                <Card
                  key={row.id}
                  sx={{
                    border: "2px solid black",
                    margin: "5px",
                    padding: "0 !important",
                  }}
                >
                  <Grid container margin={1}>
                    <Grid item xs={11} style={{ fontSize: "35px" }}>
                      {row.productname}
                    </Grid>
                    <Grid item xs={1} style={{ fontSize: "25px" , marginTop:"4px"}}>
                      {row.category}
                    </Grid>
                  </Grid>

                  {/* <CardHeader
                   action={ row.category}
                    title={row.productname}
                  /> */}
                  <img
                    src={`/images/${row.image}`}
                    alt="product"
                    width={310}
                    height={200}
                  />
                  <CardContent sx={{ padding: "2% !important" }}>
                    <Typography variant="body2" color="text.secondary">
                      {row.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Price: {row.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Manufactured Date: {row.manufacturedDate}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Expiry Date: {row.expiryDate}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Product Quantity: {row.dropdown}
                    </Typography>
                    <CardActions>
                      <IconButton
                        aria-label="edit"
                        sx={{ color: "#4caf50" }}
                        onClick={() => {
                          handleUpdate(row?.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        sx={{ color: "red" }}
                        onClick={() => handleDelete(row?.id)}
                      >
                        <DeleteForever />
                      </IconButton>
                    </CardActions>
                  </CardContent>
                </Card>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          xs={12}
          position="fixed"
          width="100%"
          marginTop="100%"
          bottom="0"
        >
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
