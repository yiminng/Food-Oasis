import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import PantryIcon from 'components/pantryIcon';
import MealIcon from 'components/mealIcon';

const useStyles = makeStyles((theme) => ({
  select: {
    color: "white",
  },
  menuItems: {
    fontSize: "max(.8vw,12px)",
    color: "#000",
  },
  controlPanel: {
    backgroundColor: theme.palette.primary.main,
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
    backgroundColor: "#BCE76D",
    borderRadius: "0 6px 6px 0",
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
    "&.Mui-disabled": {
      backgroundColor: "#BCE76D",
      opacity: 0.8,
    },
    "&:hover": {
      backgroundColor: "#C7F573",
      boxShadow: "none",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: ".5rem",
    },
  },
  buttonHolder: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
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
          <Button>
            <PantryIcon />
            Pantries
          </Button>
        </Grid>
        <Grid item>
          <Button>
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
