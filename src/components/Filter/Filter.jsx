import { Box, Slider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../MyContext";

export default function Filter({ allData, setFilterData }) {
  const handleSearch = (event) => {
    console.log(event);
    const value = event.target.value;
    const data = allData.filter((data) =>
      data.productname.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(data);
  };
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    const filteredData = allData.filter((data) => data.category === value);
    setFilterData(filteredData);
  };

  const handleSliderChange = (event, value) => {console.log( value);
    const filteredData = allData.filter(
      (data) => data.price < value
    );
    setFilterData(filteredData);console.log(filteredData);
  };
  

  return (
    <>
      <Box border="2px solid black" padding="20px">
        <Slider min={100} max={2000} size="small" color="black" onChange={handleSliderChange} />
        <ToggleButtonGroup size="large" onChange={handleCategoryChange}>
          <ToggleButton value="1">Type 1</ToggleButton>
          <ToggleButton value="2">Type 2</ToggleButton>
          <ToggleButton value="3">Type 3</ToggleButton>
        </ToggleButtonGroup>
        <input
          type="search"
          onChange={handleSearch}
          placeholder="Search By Product Name"
          style={{
            height: "35px",
            width: "100%",
            border: "1px solid black",
            marginTop: "15px",
          }}
        />
      </Box>
    </>
  );
}
