import React, { useState } from "react";
import HomePage from "@/components/HomePage/Index";
import { Box, Button, Container, Tab, Tabs } from "@mui/material";
import { Modal } from "@mui/material";
import AddEdit from "@/components/AddEditModal/AddEdit";
import { modalStyle } from "@/components/utilities";
import Head from "next/head";
import Map from "@/components/MapBox/Map";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [location, setLocation] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => setValue(newValue);

  const handleLocationChange = (newLocation) => setLocation(newLocation);

  return (
    <div>
      <Head>
        <title>CRUD OPERATIONS | Products</title>
      </Head>
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
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Add/Edit" />
              <Tab label="Location" />
            </Tabs>
            {value === 0 && (
              <AddEdit onClose={handleClose} location={location} />
            )}
            {value === 1 && (
              <Map
                onClose={handleClose}
                onLocationChange={handleLocationChange}
              />
            )}
          </Box>
        </Modal>
        <HomePage />
      </Container>
    </div>
  );
};

export default Index;
