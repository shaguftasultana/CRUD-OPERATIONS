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
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaForm } from "../utilities";
import axios from "axios";
import { useRouter } from "next/router";
import { MyContext } from "../MyContext";
import { Checkbox } from "@mui/material";
import { formDataFormat } from "../utilities";

const AddEdit = ({ onClose, formData, setFormData }) => {
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
    defaultValues: state.dataToEdit ? state.dataToEdit : formData,
  });

  const onSubmit = (value) => {
    if (value?._id) {
      axios
        .patch("http://localhost:3000/api/v1", { data: value })
        .then((response) => {
          dispatch({ type: "UPADATE_DATA", payload: response.data.data });
        });
      dispatch({
        type: "EDIT_DATA",
        payload: "",
      });
    } else {
      const formData = formDataFormat({ ...value });
      axios.post("http://localhost:3000/api/v2", formData).then((response) => {
        dispatch({ type: "UPADATE_DATA", payload: response.data.data });
      });
    }
    reset();
    onClose();
    const newFormData = { ...formData, ...value }; // merge new form data with existing formData
    setFormData(newFormData);
  };
  useEffect(() => {
    setFormData(watch()); // update formData state whenever form data changes
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center">
          <Box>
            <Typography variant="h5" fontWeight="bold" padding="1rem">
              INPUT FORM
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <InputLabel
                size="small"
                sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
              >
                Name :
              </InputLabel>
            </Grid>

            <Grid item xs={9}>
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
            <Grid item xs={3}>
              <InputLabel
                size="small"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "end",
                }}
              >
                Description:
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
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
            <Grid item xs={3}>
              <InputLabel
                size="small"
                sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
              >
                Price:
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
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
            <Grid item xs={3}>
              <InputLabel
                size="small"
                sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
              >
                Manufactured
                <br /> Date:
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField
                sx={{ width: "100%" }}
                type="date"
                size="small"
                variant="filled"
                name="manufacturedDate"
                {...register("manufacturedDate")}
              />
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
            <Grid item xs={3}>
              <InputLabel
                size="small"
                sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
              >
                Expiry <br />
                Date:
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
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
            <Grid item xs={3}>
              <InputLabel
                size="small"
                sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
              >
                Product <br />
                Image:
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              <Button size="small" variant="filled">
                <input
                  sx={{ width: "100%" }}
                  type="file"
                  name="image"
                  size="small"
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
            <Grid item xs={3}>
              <InputLabel
                size="small"
                sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
              >
                Category:
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              <Controller
                defaultValue={""}
                size="small"
                name="category"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    size="small"
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
            <Grid item xs={3}>
              <InputLabel
                id="demo-select-small"
                size="small"
                sx={{ color: "black", fontWeight: "bold", textAlign: "end" }}
              >
                Product <br /> Quantity:
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              <Controller
                name="dropdown"
                control={control}
                size="small"
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
            <Grid item xs={9}>
              <Controller
                name="checkbox"
                variant="filled"
                size="small"
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

          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
              >
                SAVE
              </Button>
            </Box>
            <Box>
              <Button
                onClick={onClose}
                variant="contained"
                color="error"
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </form>
    </>
  );
};
export default AddEdit;
