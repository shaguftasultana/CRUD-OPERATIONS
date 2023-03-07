import { useEffect, useState, useContext } from "react";
import axios from "axios";
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
  description,
  price,
  manufacturedDate,
  expiryDate,
  category
) {
  return {
    id,
    description,
    productname,
    price,
    manufacturedDate,
    expiryDate,
    category,
  };
}

export default function TableData() {
  const router = useRouter();
  const { state, dispatch } = useContext(MyContext);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(state.allData)
    console.log(state);

  }, [state]);
 

  const handleDelete = async (id) => {
    alert("are you sure you want to delete");
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/FormData",
        {
          data: { id: id },
        }
      );
      console.log(response);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item sx={{ position: "absolue", Top: "0", width: "100%" }}>
          <Header />
        </Grid>
        <Grid item margin="2%" marginTop="3%" marginLeft="65%" xs={12} sm={6}>
          <Link
            href="/components/AddEdit"
            passHref
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "black",
                color: "white",
                marginLeft: "15em",
              }}
              disableElevation
            >
              Add New Record
            </Button>
          </Link>
        </Grid>
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
                  <StyledTableCell align="center" colSpan={2}>
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.productname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.manufacturedDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.expiryDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        style={{ color: "Red" }}
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteForever />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button 
                        style={{ color: "green" }}
                        onClick={() => dispatch({ type: "SHOW", payload: row })}
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
