import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      sx={{
        
        padding : '10px 5px',
        color: "white",
        textAlign: "center",
        bgcolor: "#333333",
        marginTop: "2em",
        justifyContent: "center",
        alignItems: "center",
       
      }}
    >
      <Typography variant="body1">@all rights are reserved</Typography>
    </Box>
  );
}
