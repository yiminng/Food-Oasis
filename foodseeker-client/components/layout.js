import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Head from 'components/head';
import Filters from 'components/filters';
import Header from 'components/header';

const useStyles = makeStyles((theme) => ({
  listMapContainer: {
    height: 'calc(100vh - 62px - 70px)',
    overflow: 'hidden',
    // [theme.breakpoints.down("sm")]: {
    //   height: "100%",
    // },
    // [theme.breakpoints.up("md")]: {
    //   height: "79%",
    // },
  },
  grid: {
    overflow: 'hidden',
  },
}));

export default function Layout({ origin, setOrigin, children }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      alignContent="stretch"
      spacing={0}
      className={classes.grid}
    >
      <Head />
      <Header />
      <Filters origin={origin} setOrigin={setOrigin} />
      <Grid item container spacing={0} className={classes.listMapContainer}>
        {children}
      </Grid>
    </Grid>
  );
};
