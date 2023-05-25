import React, { ElementRef, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import "mapbox-gl/dist/mapbox-gl.css";
import { Grid, IconButton, Paper, Button, Box } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import Location from "../SavedLocation/Location";
import Autocomplete from "@mui/material/Autocomplete";
import { MyContext } from "../MyContext";
import {
  LatLngCoordinatesType,
  FeaturesType,
  CoordinatesType,
} from "../../Interfaces";
import { CREATE_LOCATION } from "../../constrain/Query";
import { useMutation } from "@apollo/client";

const Map = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const { dispatch } = useContext(MyContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [originalView, setOriginalView] = useState<CoordinatesType>({
    center: [15.4542, 18.7322],
    zoom: 1.8,
  });
  const [savedLocation, setSavedLocation] = useState<object | string>({});
  const [centeredView, setCenteredView] = useState<number | null>(null);
  const [searchInputAddress, setSearchInputAddress] = useState<string>("");
  const [options, setOptions] = useState<string[] | []>([]);
  const [createLocation] = useMutation(CREATE_LOCATION);

  const mapContainer: any = useRef(null);
  const map: any = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ??
      "pk.eyJ1IjoiYmFzaXQ1MTYiLCJhIjoiY2xmNnQ2d2tjMTlhbzNzbzFwbDJ3N3BnMyJ9.1lQifImgO1e1XcdRuyL2IQ";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: originalView.center as any,
      zoom: originalView.zoom,
    });
  }, [originalView]);

  const handleEdit = async (center: LatLngCoordinatesType) => {
    setCenteredView([center.lng, center.lat, center.address] as any);
    const mapInstance: any = map.current;
    if (mapInstance) {
      mapInstance.flyTo({
        center: [center.lng, center.lat],
        zoom: 12,
      });
      new mapboxgl.Marker()
        .setLngLat([center.lng, center.lat])
        .addTo(mapInstance);
    } else {
      console.error("Map instance not found");
    }
  };
  const handleSearchInputChange = async (event: any) => {
    const { value } = event.target;
    setSearchValue(value);

    if (value.length > 0) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}`
        );

        const suggestions = response.data.features.map(
          (feature: FeaturesType) => ({
            label: feature.place_name,
            longitude: feature.center[0],
            latitude: feature.center[1],
          })
        );
        setOptions(suggestions);
        setSearchInputAddress(value);
      } catch (error) {
        console.error(error);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSearch = async (value?: string) => {
    if (value) setSearchValue(value);

    if (value && value.length > 0)
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        const [longitude, latitude] = data.features[0].center;
        map.current.flyTo({ center: [longitude, latitude], zoom: 12 });

        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
        setSavedLocation({
          address: data.features[0].place_name,
          latitude,
          longitude,
        });
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
  };
  const handleSave = async () => {
    const location: any = savedLocation;
    console.log(location);
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
      console.log(data);
      try {
        const response = await createLocation({
          variables: {
            input: data,
          },
        });

        dispatch({
          type: "UPDATE_LOCATION",
          payload: response.data.createLocation,
        });
        setSavedLocation("");
        setSearchInputAddress("");
      } catch {
        console.error("Location not found");
      }
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Location handleEdit={handleEdit} />
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
                  getOptionLabel={(option: any) => option.label}
                  onChange={(value: any) => {
                    if (value) {
                      setSearchInputAddress(value.options);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search for a location"
                      variant="outlined"
                      onChange={handleSearchInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch(
                            (e.target as unknown as { value: string }).value
                          );
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <IconButton onClick={() => handleSearch() as any}>
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
