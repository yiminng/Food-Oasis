import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import PantryIcon from 'components/pantryIcon';
import MealIcon from 'components/mealIcon';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  select: {
    color: "white",
  },
  menuItems: {
    fontSize: "max(.8vw,12px)",
    color: "#000",
  },
  controlPanel: {
    backgroundColor: palette.primary.main,
    padding: "1rem 0",
    flex: "1 0 auto",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
  submit: {
    height: "40px",
    minWidth: "25px",
    backgroundColor: palette.tertiary.main,
    borderRadius: "0 6px 6px 0",
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
    "&.Mui-disabled": {
      backgroundColor: palette.tertiary.main,
      opacity: 0.8,
    },
    "&:hover": {
      backgroundColor: palette.tertiary.light,
      boxShadow: "none",
    },
    [breakpoints.down("xs")]: {
      marginRight: ".5rem",
    },
  },
  categoryButton: {
    color: palette.primary.contrastText,
  },
  buttonHolder: {
    display: "flex",
    [breakpoints.down("xs")]: {
      marginTop: "0.5rem",
    },
  },
}));

const Filters = () => {
  const classes = useStyles();

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
          {/* <Search
            userCoordinates={userCoordinates}
            setOrigin={setOrigin}
            origin={origin}
          /> */}
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
