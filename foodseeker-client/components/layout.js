import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Head from 'components/head';
import Filters from 'components/filters';
import Header from 'components/header';

const useStyles = makeStyles(({ breakpoints }) => ({
  listMapContainer: {
    height: 'calc(100vh - 62px - 70px)',
    overflow: 'hidden',
    [breakpoints.down('sm')]: {
      height: 'calc(100vh - 162px)',
      overflowY: 'scroll',
    },
  },
  grid: {
    overflow: 'hidden',
  },
}));

export default function Layout({ origin, setOrigin, isMapView, setMapView, children }) {
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
      <Filters origin={origin} setOrigin={setOrigin} isMapView={isMapView} setMapView={setMapView} />
      <Grid item container spacing={0} className={classes.listMapContainer}>
        {children}
      </Grid>
    </Grid>
  );
};
