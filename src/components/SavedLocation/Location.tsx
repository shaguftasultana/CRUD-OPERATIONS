import {
  Typography,
  Grid,
  Card,
  Button,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import { useLocationFetching } from "../../constrain/dataFetcherHook";
import { DELETE_LOCATION_MUTATION } from "../../constrain/Query";
import { useMutation } from "@apollo/client";

const Location = ({ handleEdit }: { handleEdit: any }): JSX.Element => {
  useLocationFetching();
  const { state, dispatch } = useContext(MyContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<any>(null);
  const [deleteLocation] = useMutation(DELETE_LOCATION_MUTATION);

  const handleDelete = async (id: string) => {
    try {
      await deleteLocation({ variables: { _id: id } });
      dispatch({ type: "DELETE_LOCATION", payload: id });
    } catch (error) {}
    setDeleteItemId(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogOpen = (id: string) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteItemId(null);
    setDeleteDialogOpen(false);
  };
  return (
    <>
      <Card sx={{ marginTop: "10%", height: "500px", overflowY: "scroll" }}>
        <Typography
          textAlign="center"
          fontWeight="bold"
          fontSize={20}
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          Our Locations
        </Typography>
        <Grid container>
          {state.allLocations.map((location: any) => (
            <Grid item xs={12} key={location.id}>
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
                    handleDeleteDialogOpen(location._id);
                  }}
                >
                  DELETE
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Card>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this location?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteItemId)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Location;
