import React, { useContext, useEffect } from "react";
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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaForm, generateRandomId } from "../utilities";
import axios from "axios";
import { useRouter } from "next/router";
import { MyContext } from "../MyContext";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { formDataFormat } from "../utilities";


const AddEdit = ({ previousData }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      state.dataToEdit
        ? validationSchemaForm(true)
        : validationSchemaForm(false)
    ),
    defaultValues: state.dataToEdit ? state.dataToEdit : {},
  });

  const { dataToEdit } = state;


  const onSubmit = (value) => {

    if (value?._id) {
      
      axios.patch("http://localhost:3000/api/v1",  { data : value}).then((response) => {
        dispatch({ type: "UPADATE_DATA", payload: response.data.data });
      });
      dispatch({
        type: "EDIT_DATA",
        payload: "",
      });

    } else {
      const formData = formDataFormat({  ...value})
      axios.post("http://localhost:3000/api/v2", formData).then((response) => {
        dispatch({ type: "UPADATE_DATA", payload: response.data.data });
      });
    }

    reset();
    router.push("/");
  };
  const onCancel = () => {
    dispatch({
      type: "EDIT_DATA",
      payload: "",
    });
    router.push("/"); // Navigate to the new form layout page
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
            sx={{
              padding: "3px 20px",
              border: "2px solid black",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold" padding="2%">
                INPUT FORM
              </Typography>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={2}>
                <InputLabel
                  sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
                >
                  Name :
                </InputLabel>
              </Grid>

              <Grid item xs={10}>
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  id="Name Required"
                  variant="filled"
                  name="productname"
                  {...register("productname")}
                />
              </Grid>
              <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                &nbsp;
              </Grid>
              <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                {errors.productname && (
                  <p
                    style={{
                      color: "red",
                      textAlign: "start",
                      marginLeft: "15rem !important",
                    }}
                  >
                    {errors.productname.message}
                  </p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={2}>
                <InputLabel
                  sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
                >
                  Description:
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  sx={{ width: "100%" }}
                  id="filled-multiline-flexible"
                  size="small"
                  multiline
                  maxRows={6}
                  variant="filled"
                  name="description"
                  {...register("description")}
                />
              </Grid>
              <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                &nbsp;
              </Grid>
              <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                {errors.description && (
                  <p style={{ color: "red" }}>{errors.description.message}</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={2}>
                <InputLabel
                  sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
                >
                  Price:
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  sx={{ width: "100%" }}
                  id="Price Required"
                  size="small"
                  variant="filled"
                  name="price"
                  {...register("price")}
                />
              </Grid>
              <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                &nbsp;
              </Grid>
              <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                {errors.price && (
                  <p style={{ color: "red" }}>{errors.price.message}</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={2}>
                <InputLabel
                  sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
                >
                  Manufactured
                  <br /> Date:
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  sx={{ width: "100%" }}
                  type="date"
                  size="small"
                  variant="filled"
                  name="manufacturedDate"
                  {...register("manufacturedDate")}
                />{" "}
              </Grid>
              <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                &nbsp;
              </Grid>
              <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                {errors.manufacturedDate && (
                  <p style={{ color: "red" }}>
                    {errors.manufacturedDate.message}
                  </p>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={2}>
                <InputLabel
                  sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
                >
                  Expiray Date:
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  sx={{ width: "100%" }}
                  type="date"
                  size="small"
                  variant="filled"
                  name="expiryDate"
                  {...register("expiryDate")}
                />
              </Grid>
              <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                &nbsp;
              </Grid>
              <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                {errors.expiryDate && (
                  <p style={{ color: "red" }}>{errors.expiryDate.message}</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={2}>
                <InputLabel
                  sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
                >
                  Product <br />
                  Image:
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <Button size="small" variant="filled">
                  <input
                    sx={{ width: "100%" }}
                    type="file"
                    name="image"
                    // defaultValue={watch().image?watch().image : undefined }
                    {...register("image")}
                  />
                </Button>
              </Grid>
              <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                &nbsp;
              </Grid>
              <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                {errors.image && (
                  <p style={{ color: "red" }}>{errors.image.message}</p>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={2}>
                <InputLabel
                  sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
                >
                  Category:
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  defaultValue={""}
                  size="small"
                  name="category"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      row
                      value={value}
                      onChange={onChange}
                      sx={{ paddingLeft: "20px" }}
                    >
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
              </Grid>
              <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                &nbsp;
              </Grid>
              <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                {errors.category && (
                  <p style={{ color: "red" }}>{errors.category.message}</p>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={2}>
                <InputLabel
                  id="demo-select-small"
                  sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
                >
                  Product <br /> Quantity:
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <Controller
                  //  defaultValue={""}
                  name="dropdown"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      color="secondary"
                      onChange={onChange}
                      value={value || watch().dropdown}
                      sx={{
                        width: "100%",
                        height: "90%",
                        defaultborder: "none",
                      }}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  )}
                />
              </Grid>

              <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                &nbsp;
              </Grid>
              <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                {errors.dropdown && (
                  <p style={{ color: "red" }}>{errors.dropdown.message}</p>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={5} marginLeft="2%">
              <Grid item xs={10}>
                <Controller
                  name="checkbox"
                  variant="filled"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Grid item sx={{ marginTop: "-.5rem" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="default"
                            checked={field.value === "true"}
                            onChange={(event) =>
                              field.onChange(event.target.checked ? "true" : "")
                            }
                          />
                        }
                        label="All information related to product are correctly checked"
                      />
                    </Grid>
                  )}
                />
                <Grid item xs={3} sx={{ m: "0%", p: "0% !important" }}>
                  &nbsp;
                </Grid>
                <Grid item xs={9} sx={{ m: "0%", p: "0% !important" }}>
                  {errors.checkbox && (
                    <p style={{ color: "red" }}>{errors.checkbox.message}</p>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Box>
                <Button
                  type="submit"
                  variant="filled"
                  sx={{
                    backgroundColor: "success.main",
                    border: "2px solid black",
                    height: "5%",
                    margin: "10px",
                    padding: "15px",
                    width: "200px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  SAVE
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={onCancel}
                  variant="filled"
                  sx={{
                    backgroundColor: "error.main",
                    border: "2px solid black",
                    height: "5%",
                    margin: "10px",
                    padding: "15px",
                    width: "200px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </form>
    </>
  );
};
export default AddEdit;
