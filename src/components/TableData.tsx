import { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { MyContext } from "./MyContext";
import { useRouter } from "next/router";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Filter from "./Filter/Filter";
import Notifications from "./Notifications";

export default function TableData({
  handleOpen,
}: {
  handleOpen: () => void;
}): JSX.Element {
  const { state, dispatch } = useContext(MyContext);
  const [reset, setReset] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteId, setIsDeleteId] = useState(null);
  // const { allData } = useContext(MyContext);

  const resetState = () => setReset(!reset);

  useEffect(() => {
    setFilterData(state.allData);
  }, [state.allData, reset]);

  const handleUpdate = (_id: any) => {
    const selectedRow = state.allData.find((row: any) => row._id === _id);

    dispatch({
      type: "EDIT_DATA",
      payload: selectedRow,
    });
    handleOpen();
  };

  const CloseNotification = () => setIsDelete(false);
  const RemoveId = () => setIsDeleteId(null);
  return (
    <>
      <Grid container>
        {isDelete && (
          <Notifications
            open={isDelete}
            closeNotification={CloseNotification}
            id={isDeleteId}
            removeId={RemoveId}
          />
        )}
        <Grid container sx={{ marginLeft: "5%" }}></Grid>
        <Grid
          container
          sx={{
            display: "flex",
            marginLeft: 2,
            marginTop: 6,
            marginBottom: 5,
            ping: 2,
          }}
        >
          <Grid item xs={3} marginTop="5px">
            <Filter
              allData={filterData}
              setFilterData={setFilterData}
              resetState={resetState}
            />
          </Grid>
          <Grid item xs={9} display="grid" gridTemplateColumns="1fr 1fr 1fr">
            {filterData && filterData.length === 0 ? (
              <>
                <Typography
                  sx={{ marginLeft: "80%", ping: "20%", fontSize: 20 }}
                >
                  No Data Found....
                </Typography>
              </>
            ) : (
              filterData &&
              filterData.map((row: any, i) => (
                <Card
                  key={i}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    margin: "5px",
                    ping: "5px",
                    "&:hover": {
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Grid container margin={1}>
                    <Grid item xs={12} style={{ fontSize: "30px" }}>
                      {row.productname}
                    </Grid>
                    <Grid item xs={12} style={{ fontSize: "18px" }}>
                      {row.category}
                    </Grid>
                  </Grid>
                  <Box m={0}>
                    <img
                      src={`/images/${row.image}`}
                      alt="product"
                      width={310}
                      height={200}
                    />
                  </Box>

                  <CardContent>
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
                  </CardContent>

                  <CardActions>
                    <IconButton
                      aria-label="edit"
                      sx={{ color: "#4caf50" }}
                      onClick={() => {
                        if (
                          state.allData
                            .map((data: any) => data._id)
                            .includes(row._id)
                        ) {
                          handleUpdate(row._id);
                        } else {
                          console.error("not found");
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: "red" }}
                      onClick={() => {
                        setIsDelete(true);
                        setIsDeleteId(row._id);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  </CardActions>
                </Card>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
