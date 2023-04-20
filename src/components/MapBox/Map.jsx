import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import "mapbox-gl/dist/mapbox-gl.css";
import { Grid, IconButton, Paper, Button, Box } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "@/components/MyContext";
import Location from "../SavedLocation/Location";
import Autocomplete from "@mui/material/Autocomplete";

const Map = ({ onClose }) => {
  const { state, dispatch } = useContext(MyContext);
  const [searchValue, setSearchValue] = useState("");
  const [originalView, setOriginalView] = useState({
    center: [15.4542, 18.7322],
    zoom: 1.8,
  });
  const [savedLocation, setSavedLocation] = useState({});
  const [centeredView, setCenteredView] = useState(null);
  const [searchInputAddress, setSearchInputAddress] = useState("");
  const [options, setOptions] = useState([]);

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ??
      "pk.eyJ1IjoiYmFzaXQ1MTYiLCJhIjoiY2xmNnQ2d2tjMTlhbzNzbzFwbDJ3N3BnMyJ9.1lQifImgO1e1XcdRuyL2IQ";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: originalView.center,
      zoom: originalView.zoom,
    });
  }, [originalView]);

  const handleEdit = async (center) => {
    setCenteredView([center.lng, center.lat, center.address]);
    const mapInstance = map.current;
    if (mapInstance) {
      mapInstance.flyTo({
        center: [center.lng, center.lat],
        zoom: 15,
      });
      new mapboxgl.Marker()
        .setLngLat([center.lng, center.lat])
        .addTo(mapInstance);
    } else {
      console.error("Map instance not found");
    }
  };
  const handleSearchInputChange = async (event) => {
    const { value } = event.target;
    setSearchValue(value);
    console.log(value);

    if (value.length > 0) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}`
        );

        const suggestions = response.data.features.map((feature) => ({
          label: feature.place_name,
          longitude: feature.center[0],
          latitude: feature.center[1],
        }));
        setOptions(suggestions);
        setSearchInputAddress(value);
      } catch (error) {
        console.error(error);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSearch = async () => {
    const { value } = event.target;
    setSearchValue(value);
    console.log(value);

    if (value.length > 0)
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        const [longitude, latitude] = data.features[0].center;
        map.current.flyTo({ center: [longitude, latitude], zoom: 18 });
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
        setSavedLocation({ address: searchValue, latitude, longitude });
        setSearchValue(searchValue);
      } catch (error) {
        console.error(error);
      }
  };

  const handleCancel = () => {
    setSearchValue("");
    setOriginalView({ center: [15.4542, 18.7322], zoom: 1.8 });
    setSavedLocation("");
    setSearchInputAddress("");
    console.log("Cancelled" + searchValue, searchInputAddress, savedLocation);
  };
  const handleSave = () => {
    const location = savedLocation;
    if (
      location &&
      location.address &&
      location.latitude &&
      location.longitude
    ) {
      const data = {
        address: location.address,
        lng: location.longitude,
        lat: location.latitude,
      };

      axios.post("http://localhost:3000/api/v3", data).then((response) => {
        dispatch({ type: "UPDATE_LOCATION", payload: response.data.data });
        setSavedLocation("");
        setSearchInputAddress("");
      });
    } else {
      console.error("Location not found");
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Location
            searchInputAddress={searchInputAddress}
            handleEdit={handleEdit}
          />
        </Grid>
        <Grid item xs={8}>
          <Paper
            sx={{
              marginTop: "5%",
              marginLeft: "1%",
            }}
          >
            <Grid
              container
              sx={{ flexDirection: "column", width: "100%", height: "70vh" }}
            >
              <Grid
                item
                sx={{ width: "100%", marginBottom: "4px" }}
                className="search-container"
              >
                <Autocomplete
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onChange={(value) => {
                    if (value) {
                      setSearchInputAddress(value.options);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search for a location"
                      variant="outlined"
                      value={searchInputAddress && searchValue}
                      onChange={handleSearchInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <IconButton onClick={handleSearch}>
                            <SearchIcon />
                          </IconButton>
                        ),
                        endAdornment: (
                          <IconButton
                            onClick={handleCancel}
                            sx={{ marginRight: "0%" }}
                          >
                            <ClearIcon />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                sx={{ width: "100%", flexGrow: 1 }}
                className="map-container"
                ref={mapContainer}
              ></Grid>
            </Grid>
          </Paper>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "flex-end",
              marginTop: "6rem",
            }}
          >
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                onClick={() => {
                  handleSearch();
                  handleSave();
                }}
              >
                SAVE
              </Button>
            </Box>
            <Box>
              <Button
                onClick={onClose}
                variant="contained"
                color="error"
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Map;
