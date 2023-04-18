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

const Map = ({ onClose }) => {
  const { state, dispatch } = useContext(MyContext);
  const [searchValue, setSearchValue] = useState("");
  const [originalView, setOriginalView] = useState({
    center: [15.4542, 18.7322],
    zoom: 1.8,
  });
  const [savedLocation, setSavedLocation] = useState({});
  const [centeredView, setCenteredView] = useState(null);
  const [searchInputAddress, setSearchInputAddress] = useState([]);

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
        zoom: 3,
      });
      new mapboxgl.Marker()
        .setLngLat([center.lng, center.lat])
        .addTo(mapInstance);
    } else {
      console.error("Map instance not found");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const [longitude, latitude] = data.features[0].center;
      map.current.flyTo({ center: [longitude, latitude], zoom: 3 });
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map.current);
      setSavedLocation({ address: searchValue, latitude, longitude });
      setSearchInputAddress(searchValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setSearchValue("");
    setOriginalView({ center: [15.4542, 18.7322], zoom: 1.8 });
    setSavedLocation("");
    setSearchInputAddress("");
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
              marginRight: "0",
              marginBottom: "5%",
              marginLeft: "1%",
            }}
          >
            <Grid
              container
              sx={{ flexDirection: "column", width: "100%", height: "100vh" }}
            >
              <Grid item sx={{ width: "100%" }} className="search-container">
                <TextField
                  fullWidth
                  variant="filled"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    ),
                    endAdornment: (
                      <IconButton onClick={handleCancel}>
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
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
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "flex-end" }}>
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
    </>
  );
};

export default Map;
