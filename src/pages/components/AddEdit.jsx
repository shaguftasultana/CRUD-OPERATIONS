import React, { useContext } from "react";
import {
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  TextField,
  InputLabel,
  Paper,
  FormGroup,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema, generateRandomId } from "./utilities";
import axios from "axios";
import { useRouter } from "next/router";
import { MyContext } from "./MyContext";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import {formDataFormat} from "./utilities"



const AddEdit = ({ previousData }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(MyContext);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: state.dataToEdit ? state.dataToEdit : {},
  });
  const { dataToEdit } = state;

  const onSubmit = (value) => {

    if (dataToEdit?.id) {
      const formData = formDataFormat(value, dataToEdit.id);
      axios
        .patch("/api/v1", formData)
        .then((response) => {
          dispatch({ type: "UPADATE_DATA", payload: response.data.data });
        });

        dispatch({ 
          type: "EDIT_DATA",
          payload: '' ,
        });
    } else {
      const data = {
        ...value,
        id: generateRandomId(),
      };
      const formData = formDataFormat(data, generateRandomId());
      axios.post("/api/v1", formData).then((response) => {
        dispatch({ type: "UPADATE_DATA", payload: response.data.data });
      });
    }
  
    reset();
    setSubmitMessage("Form submitted successfully!");
    router.push("../components/TableData");
  };
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ width: "70%", margin: "auto", marginTop: "4rem" }}
        >
          <Paper
            sx={{ padding: "20px", border: "2px solid black", width: "800px" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                INPUT FORM
              </Typography>
            </Box>
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Name
              </InputLabel>
              <TextField
                size="small"

    
                id="Name Required"
                label="Enter Product Name"
                variant="filled"
                name="productname"
                {...register("productname")}
                 fullWidth
              />
              {errors.productname && (
                <p style={{ color: "red" }}>{errors.productname.message}</p>
              )}
            </Grid>
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Product Image
              </InputLabel>
              <Button size="small" variant="filled">
                <input type="file" name="image" {...register("image")}
                  fullWidth
                //  defaultValue={dataToEdit?.image} 
                />
              </Button>
              {errors.image && (
                <p style={{ color: "red" }}>{errors.image.message}</p>
              )}
            </Grid>
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Description
              </InputLabel>
              <TextField
          
                id="filled-multiline-flexible"
                label="Product Details"
                size="small"
                multiline
                maxRows={4}
                variant="filled"
                name="description"
                {...register("description")}
                 fullWidth
              />
              {errors.description && (
                <p style={{ color: "red" }}>{errors.description.message}</p>
              )}
            </Grid>
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Price
              </InputLabel>
              <TextField
                fullWidth
                id="Price Required"
                label="Product Price In Rupees"
                size="small"
                variant="filled"
                name="price"
                {...register("price")}
                
              />
              {errors.price && (
                <p style={{ color: "red" }}>{errors.price.message}</p>
              )}
            </Grid>
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Manufactured Date
              </InputLabel>
              <TextField
            
                type="date"
                size="small"
                variant="filled"
                name="manufacturedDate"
                {...register("manufacturedDate")}
                 fullWidth
              />
              {errors.manufacturedDate && (
                <p style={{ color: "red" }}>
                  {errors.manufacturedDate.message}
                </p>
              )}
            </Grid>
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Expiry Date
              </InputLabel>
              <TextField
                type="date"
                size="small"
                variant="filled"
                name="expiryDate"
                {...register("expiryDate")}
                 fullWidth
              />
              {errors.expiryDate && (
                <p style={{ color: "red" }}>{errors.expiryDate.message}</p>
              )}
            </Grid>
            <Grid item padding="2px">
              <Grid item>
                <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                  Category
                </InputLabel>
              </Grid>
              <Grid item>
                <Controller
                  name="category"
                  control={control}
                   fullWidth
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup row value={value} onChange={onChange}>
                      <FormControlLabel
                        value="1"
                        control={<Radio color="default" size="small" />}
                        label="Category 1"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="default" size="small" />}
                        label="Category 2"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio color="default" size="small" />}
                        label="Category 3"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.category && (
                  <p style={{ color: "red" }}>{errors.category.message}</p>
                )}
              </Grid>
              <Grid item padding="2px">
                 <FormGroup>
                 <FormControlLabel
                    size="small"
                    variant="filled"
                   name="checkbox"
                    control={<Checkbox  color="default" size="small" />}
                    label="All information related to product are correctly checked"
                     {...register("checkbox")}
                    fullWidth
                     //  defaultValue={dataToEdit?.checkbox}
                  />{errors.checkbox && (
                    <p style={{ color: "red" }}>{errors.checkbox.message}</p>
                  )}
                </FormGroup> 
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                type="submit"
                variant="filled"
                color="dark"
                  sx={{
                  border: "2px solid black",
                  height: "5%",
                  margin: "5px",
                  padding: "10px",
                  width: "200px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                ADD RECORD
              </Button>
            </Box>
          </Paper>
        </Grid>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </>
  );
};
export default AddEdit;
