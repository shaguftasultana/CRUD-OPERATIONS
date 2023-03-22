import * as React from "react";
import { useState } from "react";
import { Button, InputLabel, Input, Box } from "@mui/material";
import { width } from "@mui/system";

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Do something with the search term here
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center"  }}>
    
      <Input
      style={{width:"30%"}}
      placeholder="search "
      color="black"
        value={searchTerm}
        onChange={handleInputChange}
       
      />
     
    </Box>
  );
}
