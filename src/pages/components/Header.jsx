import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ width:'100%'}}>
      <AppBar  position="static" sx={{ bgcolor: "#333333" , width:'100%'}}>
        <Toolbar>
          <Typography variant="h4" >
            Task 1
          </Typography>
        </Toolbar>
      </AppBar>
      </Box>

  );
}

