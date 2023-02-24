import React from "react";
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
  Paper
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup";

const AddEdit = () => {
  const validationSchema=Yup.object().shape({
    productname:Yup.string().required("Name is required").min(5,"At Least 5 characters are required"),
    price:Yup.number().typeError("Price is required and must be in Numbers").required("Price is required"),
    expiryDate:Yup.date().typeError("Expiray Date is required").required("Expiry date is required"),
    manufacturedDate:Yup.date().typeError("manufactured date is required").required("manufactured date is required"),
    description:Yup.string().required("description is required"),
    // image:Yup.mixed().required().test("fileType", "Image is required and file type must be an image", (value) => {
    //   return (
    //     value.length && ["image/jpeg", "image/png"].includes(value[0].type)
    //   );
    // }),
    category:Yup.string().required("category is required"),
    });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm(
   { resolver:yupResolver(validationSchema)
    }
  );
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

 
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justifyContent="center" margin="4px">
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
                fullWidth
                id="Name Required"
                label="Enter Product Name"
                variant="filled"
                name="productname"
                {...register("productname")}
              />
               {errors.productname && <p style={{ color: "red" }}>{errors.productname.message}</p>}
            </Grid>
            {/* <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Product Image
              </InputLabel>
              <Button size="small" variant="filled" >
                <input
                  type="file"
                  name="image"
                  {...register("image")}
                  
                />
              </Button>{errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
              
            </Grid> */}
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Description
              </InputLabel>
              <TextField
                fullWidth
                id="filled-multiline-flexible"
                label="Product Details"
                size="small"
                multiline
                maxRows={4}
                variant="filled"
                name="description"
                {...register("description")}
              />{errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
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
              />{errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
            </Grid>
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Manufactured Date
              </InputLabel>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="filled"
                name="manufacturedDate"
                {...register("manufacturedDate")}
              />{errors.manufacturedDate && <p style={{ color: "red" }}>{errors.manufacturedDate.message}</p>}
            </Grid>
            <Grid item padding="2px">
              <InputLabel sx={{ color: "black", fontWeight: "bold" }}>
                Expiray Date
              </InputLabel>
              <TextField
                fullWidth
                type="date" 
                size="small"
                variant="filled"
                name="expiryDate"
                {...register("expiryDate")}
              />{errors.expiryDate && <p style={{ color: "red" }}>{errors.expiryDate.message}</p>}
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
                  defaultValue=""
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
                />{errors.category && <p style={{ color: "red" }}>{errors.category.message}</p>}
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
      </form>
    </>
  );
};
export default AddEdit;
