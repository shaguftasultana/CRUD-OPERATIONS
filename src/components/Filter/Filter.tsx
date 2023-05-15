import {
  Box,
  Button,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState, useRef, SetStateAction } from "react";
import { Dispatch } from "react";
import { FormData } from "../../Interfaces";

export default function Filter({
  allData,
  setFilterData,
  resetState,
}: {
  allData: any;
  setFilterData: any;
  resetState: () => void;
}): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [value, setValue] = useState<number[]>([0, 10000]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: any) => {
    const value = event.target.value;
    const data: FormData[] = allData.filter((data: FormData) =>
      data.productname.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(data);
  };
  const handleCategoryChange = (event: any, data: number | null) => {
    setSelectedCategory(data);
    const value = event.target.value;
    const filteredData: FormData[] = allData.filter(
      (data: FormData) => data.category === value
    );
    setFilterData(filteredData);
  };

  const handleSliderChange = (event: any, newValue: number[]) => {
    setValue(newValue);
    const [min, max] = newValue;

    const filteredData: FormData[] = allData.filter((data: FormData) => {
      return data.price >= min && data.price <= max;
    });

    setFilterData(filteredData);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setValue([0, 10000]);
    setFilterData(allData);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

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
          valueLabelDisplay="auto"
          onChange={handleSliderChange as any}
          min={0}
          max={10000}
          size="small"
          sx={{ color: "black !important" }}
        />

        <ToggleButtonGroup
          size="large"
          onChange={handleCategoryChange}
          value={selectedCategory}
          exclusive
        >
          <ToggleButton style={{ flex: 1 }} value="1">
            Type 1
          </ToggleButton>
          <ToggleButton style={{ flex: 1 }} value="2">
            Type 2
          </ToggleButton>
          <ToggleButton style={{ flex: 1 }} value="3">
            Type 3
          </ToggleButton>
        </ToggleButtonGroup>

        <Button
          onClick={() => {
            resetState();
            handleReset();
          }}
          sx={{
            border: "2px solid black",
            height: "2%",
            marginTop: "20px",
            width: "150px",
            fontSize: "15px",
            fontWeight: "bold",
            variant: "filled",
            color: "black !Important",
          }}
        >
          Reset
        </Button>
      </Box>
    </>
  );
}
