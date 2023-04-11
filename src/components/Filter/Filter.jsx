import {
  Box,
  Button,
  Grid,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState ,useRef } from "react";




export default function Filter({ allData, setFilterData, resetState }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [value, setValue] = useState([0, 10000]);
  const inputRef = useRef(null);


  const handleSearch = (event) => {
    const value = event.target.value;
    const data = allData.filter((data) =>
      data.productname.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(data);
  };
  const handleCategoryChange = (event, data) => {
    setSelectedCategory(data);
    const value = event.target.value;
    const filteredData = allData.filter((data) => data.category === value);
    setFilterData(filteredData);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    const [min, max] = newValue;

    const filteredData = allData.filter((data) => {
      return data.price >= min && data.price <= max;
    });

    setFilterData(filteredData);
  };
  
  const handleReset = () => {
    setSelectedCategory(null);
    setValue([0, 10000]);
    setFilterData(allData);
    inputRef.current.value = "";
  }
  

  return (
    <>
      <Box
        border="1px solid #ccc"
        padding="15px"
        borderRadius="8px"
        boxShadow={5}
      >
        <h3>Search Products</h3>
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
        ref={inputRef}
      />
        <Slider
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          reversed
          size="small"
          color="black"
        />
        <ToggleButtonGroup
          size="large"
          onChange={handleCategoryChange}
          value={selectedCategory}
          exclusive
        >
          <ToggleButton style={{ flex:1}} value="1">Type 1</ToggleButton>
          <ToggleButton style={{ flex:1}} value="2">Type 2</ToggleButton>
          <ToggleButton style={{ flex:1}} value="3">Type 3</ToggleButton>
        </ToggleButtonGroup>

        <Button
         onClick={() => {
          resetState();
          handleReset();
        }}
          variant="filled"
          sx={{
            border: "2px solid black",
            height: "2%",
            marginTop: "20px",
            width: "150px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          Reset
        </Button>
      </Box>
    </>
  );
}
