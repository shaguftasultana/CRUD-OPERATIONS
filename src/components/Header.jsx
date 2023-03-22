import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ width:'100%',backgroundColor:"black"}}>
      <AppBar  position="static" color="black"  sx={{   width:'100%'}}>
        <Toolbar>
          <Typography variant="h4" color="white" >
            Task 1
          </Typography>
        </Toolbar>
      </AppBar>
      </Box>

  );
}

