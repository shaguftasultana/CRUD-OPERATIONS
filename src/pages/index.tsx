import React, { useState } from "react";
import { Box, Button, Container, Tab, Tabs } from "@mui/material";
import { Modal } from "@mui/material";
import AddEdit from "../components/AddEditModal/AddEdit";
import Head from "next/head";
import Map from "../components/MapBox/Map";
import TableData from "../components/TableData";
import { modalStyle } from "../components/utilities";
import { useDataFetching } from "../constrain/dataFetcherHook";

const Index = () => {
  useDataFetching(); // data fetching hook and manage state of data

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [formData, setFormData] = useState<object>({});
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
    setFormData({ ...formData });
  };

  return (
    <div>
      <Head>
        <title>Test Task | Products</title>
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
              <AddEdit
                onClose={handleClose}
                formData={formData as FormData}
                setFormData={(data) => setFormData(data)}
              />
            )}
            {value === 1 && <Map onClose={handleClose} />}
          </Box>
        </Modal>
        <TableData handleOpen={handleOpen} />
      </Container>
    </div>
  );
};

export default Index;
