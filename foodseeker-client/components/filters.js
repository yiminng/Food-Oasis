import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";

import PantryIcon from 'components/pantryIcon';
import MealIcon from 'components/mealIcon';
import Search from 'components/search';
import { useGeolocation } from "hooks/location";

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  select: {
    color: palette.primary.contrast,
  },
  menuItems: {
    fontSize: "max(.8vw,12px)",
    color: "#000",
  },
  controlPanel: {
    backgroundColor: palette.primary.main,
    padding: "1rem 0",
    position: "sticky",
    top: "48px",
    zIndex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "30rem",
    margin: "0 0.5rem",
  },
  form: {
    all: "inherit",
    backgroundColor: palette.primary.contrast,
    borderRadius: "6px",
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
  nearbyIcon: {
    maxWidth: "30px",
  },
  nearbySearch: {
    height: "40px",
    minWidth: "25px",
    padding: 0,
    borderRadius: 0,
    backgroundColor: palette.primary.contrast,
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      margin: 0,
    },
    "&.Mui-disabled": {
      opacity: 0.8,
      backgroundColor: palette.primary.contrast,
    },
    "&:hover": {
      boxShadow: "none",
    },
  },
  submit: {
    height: "40px",
    backgroundColor: palette.tertiary.main,
    borderRadius: "0 6px 6px 0",
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      marginRight: 0,
      marginLeft: "3px",
    },
    "&.Mui-disabled": {
      backgroundColor: palette.tertiary.main,
      opacity: 0.8,
    },
    "&:hover": {
      backgroundColor: palette.tertiary.light,
      boxShadow: "none",
    },
  },
  buttonHolder: {
    display: "flex",
    [breakpoints.down("sm")]: {
      marginTop: "0.5rem",
    },
  },
  categoryButton: {
    color: palette.primary.contrast,
  }
}));

const Filters = ({ origin, setOrigin }) => {
  const classes = useStyles();
  const geolocation = useGeolocation();

  return (
    <Grid
      item
      container
      wrap="wrap-reverse"
      className={classes.controlPanel}
    >
      <Grid
        item
        container
        xs={12}
        sm={6}
        md={4}
        justify="center"
        alignItems="center"
        className={classes.buttonHolder}
      >
        <Grid item>
          <Button className={classes.categoryButton}>
            <PantryIcon />
            Pantries
          </Button>
        </Grid>
        <Grid item>
          <Button className={classes.categoryButton}>
            <MealIcon />
            Meals
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.inputContainer}>
        <form
          noValidate
          style={{ all: "inherit" }}
        >
          <Search
            setOrigin={setOrigin}
            origin={origin}
          />
          <Button
            onClick={() => setOrigin(geolocation)}
            disabled={!geolocation}
            variant="contained"
            className={classes.nearbySearch}
            startIcon={<LocationSearchingIcon className={classes.nearbyIcon} />}
          />
          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            startIcon={
              <SearchIcon fontSize="large" className={classes.searchIcon} />
            }
          />
        </form>
      </Box>
    </Grid>
  );
};

export default Filters;
