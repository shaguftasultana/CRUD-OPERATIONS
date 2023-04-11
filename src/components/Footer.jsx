import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#333333",
        color: "white",
        padding: "1rem",
        marginTop: "4rem",
        marginBottom: "0%",
      }}
    >
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        All rights reserved &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
