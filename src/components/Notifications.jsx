import { Snackbar } from "@material-ui/core";
import React, { useRef } from "react";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import Slide from "@mui/material/Slide";

const Notifications = ({ open, closeNotification,id, removeId }) => {
  const { state, dispatch } = useContext(MyContext);
  const snackbarRef = useRef(null);
  const transitionRef = useRef(null);

  

  const closeNotificationPopup = () => {
    // snackbarRef.current.close();
    closeNotification()
  };
   const handleDelete = async (id) => {
    try {
      const form =  new FormData();

      form.append("id", "nojiiu")
      // form.append("productname", data.productname);
      form.append("dsds", 'sdsdsd');

      console.log(id);
      //  const res = await axios.delete("/api/v2",  {id: form});
      const res = await fetch('/api/v2', {
        method: 'DELETE',
        body: JSON.stringify('uhuhuh'),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(res);
      // dispatch({ type: "REMOVE_DATA", payload: id });
      // RemoveId();
      // CloseNotification();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Snackbar
        ref={snackbarRef}
        open={open}
        autoHideDuration={null}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
        TransitionProps={{ ref: transitionRef }}
        sx={{ backgroundColor: "white !important", marginTop: "5%" }}
      >
        <Alert
          variant="filled"
          elevation={6}
          sx={{
            width: "100%",
            color: "red",
            border: "1px solid black",
            marginTop: "13%",
            backgroundColor: "white !important",
          }}
          action={
            <>
              <Button
                color="inherit"
                size="small"
                onClick={() => handleDelete(id)}
              >
                Yes
              </Button>
              <Button color="inherit" size="small" onClick={closeNotificationPopup}>
                No
              </Button>
            </>
          }
        >
          <strong> Are you sure you want to delete?</strong>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notifications;
