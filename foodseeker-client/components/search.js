import React, { useState, useEffect } from "react";
import Downshift from "downshift";
import { MenuItem, TextField, Paper } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles } from "@material-ui/core/styles";
import { useMapboxGeocoder } from "hooks/useMapboxGeocoder";
import { useGeolocation } from "hooks/location";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "35px",
    left: 0,
    right: 0,
    width: "auto",
    height: "auto",
    maxHeight: "150px",
    overflowY: "auto",
    marginTop: 0,
    borderRadius: 4,
    zIndex: 1,
  },
  container: {
    width: '100%',
    [theme.breakpoints.down("xs")]: {
      marginLeft: ".5rem",
    },
    position: "relative",
  },
  address: {
    backgroundColor: "#fff",
    borderRadius: "4px 0 0 4px",
    height: 40,
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 14px) scale(1)",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
      borderRight: "none",
    },
    [theme.breakpoints.up("md")]: {
      width: '27rem',
    },
  },
  input: {
    "&::placeholder": {
      opacity: "1",
    },
  },
}));

export default function Search({ setOrigin, origin }) {
  const classes = useStyles();

  const geolocation = useGeolocation();
  const { mapboxResults, fetchMapboxResults } = useMapboxGeocoder();
  const [selectedPlace, setSelectedPlace] = useState('');
  const [newInputValue, updateNewInputValue] = useState(origin?.locationName);

  const handleInputChange = (event) => {
    setSelectedPlace(event.target.value);
    updateNewInputValue(event.target.value);
    fetchMapboxResults(event.target.value);
  };

  const handleDownshiftOnChange = (selectedResult) => {
    setSelectedPlace(selectedResult);

    const result = mapboxResults.find(
      (item) => item.place_name === selectedResult
    );
    console.log(result);
    if (result) {
      const [long, lat] = result.center;
      setOrigin({
        lat,
        lon: long,
        // TODO: maybe replace place_name with text
        locationName: result.place_name,
      });
    }
  };

  return (
    <>
      <Downshift
        onChange={handleDownshiftOnChange}
        itemToString={item => item ? item.place_name : ''}
      >
        {({
          getInputProps,
          getItemProps,
          inputValue,
          toggleMenu,
          isOpen,
        }) => (
          <div className={classes.container}>
            <TextField
              className={classes.address}
              variant="outlined"
              margin="none"
              fullWidth
              placeholder="Search by address or zip code"
              name="address"
              size="small"
              autoFocus={false}
              InputProps={{
                classes: {
                  input: classes.input,
                },
                ...getInputProps({
                  onClick: () => {
                    setSelectedPlace("");
                    updateNewInputValue("");
                    toggleMenu();
                  },
                  onChange: handleInputChange,
                  value:
                    newInputValue && !selectedPlace
                      ? newInputValue
                      : inputValue || selectedPlace,
                }),
              }}
            />
            {isOpen && (
              <Paper className={classes.paper} square>
                {!mapboxResults.length && geolocation && geolocation.lat && (
                  <MenuItem
                    component="div"
                    onClick={() => {
                      setOrigin({ ...geolocation, locationName: "Current Location" });
                      handleDownshiftOnChange("Current Location");
                    }}
                  >
                    <LocationOnIcon /> Current Location
                  </MenuItem>
                )}
                {mapboxResults.length > 0 &&
                  mapboxResults.slice(0, 10).map(item => 
                    <MenuItem
                      {...getItemProps({
                        item: item.place_name,
                      })}
                      key={item.id}
                      component="div"
                    >
                      {item.place_name}
                    </MenuItem>
                  )}
              </Paper>
            )}
          </div>
        )}
      </Downshift>
    </>
  );
}