import { Snackbar } from "@material-ui/core";
import React, { useRef } from "react";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import Slide from "@mui/material/Slide";

const Notifications = ({
  open,
  closeNotification,
  id,
  removeId,
}: {
  open: boolean;
  closeNotification: () => void;
  id: any;
  removeId: () => void;
}): JSX.Element => {
  const { state, dispatch } = useContext(MyContext);
  const snackbarRef = useRef(null);
  const transitionRef = useRef(null);

  const closeNotificationPopup = () => {
    closeNotification();
  };
  const handleDelete = async (id: any) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/v1", {
        data: { id: id },
      });
      dispatch({ type: "REMOVE_DATA", payload: id });
      removeId();
      closeNotification();
    } catch (error) {}
  };

  return (
    <>
      <Snackbar
        ref={snackbarRef}
        open={open}
        autoHideDuration={null}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // TransitionComponent={Slide}
        // TransitionProps={{ ref: transitionRef }}
        // sx={{ backgroundColor: "white !important", marginTop: "5%" }}
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
              <Button
                color="inherit"
                size="small"
                onClick={closeNotificationPopup}
              >
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
