import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Footer from "./Footer";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Grid, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { MyContext } from "./MyContext";
import { useRouter } from "next/router";
import Layout from "./Layout";
import Image from "next/image";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  id,
  productname,
  image,
  description,
  price,
  manufacturedDate,
  expiryDate,
  category,
  checkbox, 
  dropdown
) {
  return {
    id,
    productname,
    image,
    description,
    price,
    manufacturedDate,
    expiryDate,
    category,
    checkbox,
    dropdown
  };
}

export default function TableData() {
  const router = useRouter();
  const { state, dispatch } = useContext(MyContext);
  const [rows, setRows] = useState([]);

  const handleUpdate = (id) => {
    const shouldUpdate = window.confirm('Are you sure you want to Update?');
    if(shouldUpdate){
    const selectedRow = state.allData.find((row) => row.id === id);
    dispatch({
      type: "EDIT_DATA",
      payload: selectedRow,
    });
    router.push("/components/Layout");
  };}
  const handleAdd = () => {
    const shouldAdd = window.confirm('Are you sure you want to add new record?');
    if(shouldAdd){
    dispatch({ type: "ADD_DATA" });
    router.push({
      pathname: "/components/Layout",
    });
  };}
  const deleteItems = async (str, id) => {
    const form = new FormData();
    form.append("id", id.id);

    try {
      const data = await axios({
        method: "Delete",
        url: str,
        data: form,
      });

      return data;
    } catch (error) {
      throw error.message;
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete?');
    
    if (shouldDelete) {
      await deleteItems("http://localhost:3000/api/v1", {
        id: id,
      });
      dispatch({ type: "REMOVE_DATA", payload: id });
    }
  };
  

  return (
    <>
      <Grid container>
        <Grid item sx={{ position: "absolue", Top: "0", width: "100%" }}>
          <Header />
        </Grid>
        <Button
          variant="contained"
          style={{
            backgroundColor: "black",
            color: "white",
            marginLeft: "85%",
            marginTop: "1%",
          }}
          disableElevation
          onClick={handleAdd}
        >
          Add New Record
        </Button>
        <Grid container>
          <TableContainer
            component={Paper}
            sx={{ width: "90%", margin: "2%", marginLeft: "4%" }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product Name</StyledTableCell>
                  
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">
                    Manufactured Date
                  </StyledTableCell>
                  <StyledTableCell align="center">Expiray Date</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">
                    Product Image
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Product Quantity
                  </StyledTableCell>
                  <StyledTableCell align="center">Confirmation</StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state?.allData?.map((row) => (
                  <StyledTableRow key={row?.id}>
                    <StyledTableCell component="th" scope="row">
                      {row?.productname}
                    </StyledTableCell>
                   
                    <StyledTableCell align="center">
                      {row?.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.manufacturedDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.expiryDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.category}
                    </StyledTableCell>
                    <StyledTableCell align="center" size="small">
                      <Image
                        src={`/images/${row.image}`}
                        alt="product"
                        width={40}
                        height={40}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.dropdown}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.checkbox }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        style={{ color: "Red" , marginLeft: "60%"}}
                        onClick={() => handleDelete(row?.id)}
                      >
                        <DeleteForever />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        style={{ color: "green",marginRight: "10%"}}
                        onClick={() => {
                          handleUpdate(row?.id);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            position="fixed"
            width="100%"
            marginTop="100%"
            bottom="0"
          >
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
