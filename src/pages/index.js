import React, { useState } from "react";
import HomePage from "@/components/HomePage/Index";
import { Box, Button, Container } from "@mui/material";
import { Modal } from "@mui/material";
import AddEdit from "@/components/AddEditModal/AddEdit";
import { modalStyle } from "@/components/utilities";

const index = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Box sx={{ marginLeft: "auto", marginTop: "20px", textAlign: "end" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          onClick={handleOpen}
        >
          New Record
        </Button>
      </Box>

      <Modal open={open}>
        <Box sx={modalStyle}>
          <AddEdit onClose={handleClose} />
        </Box>
      </Modal>
      <HomePage />
    </Container>
  );
};

export default index;
