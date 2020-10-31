import { useState } from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from 'next/dynamic'

import Head from 'components/head';
import Filters from 'components/filters';
// import List from 'components/list';
import Header from 'components/header';
import { useDefaultLocation } from 'hooks/location';
import useMobile from 'hooks/useMobile';

const useStyles = makeStyles((theme) => ({
  listMapContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
    [theme.breakpoints.up("md")]: {
      height: "79%",
    },
  },
}));

// Map need access to the window so has to load client-side
const MapNoSSR = dynamic(
  () => import('components/map'),
  { ssr: false }
)

export default function Index() {
  const classes = useStyles();
  const defaultLocation = useDefaultLocation();

  const isMobile = useMobile();
  const [isMapView, setIsMapView] = useState(true);
  const [origin, setOrigin] = useState({
    lat: defaultLocation.center.lat,
    lon: defaultLocation.center.lon,
  });
  const [selectedStakeholder, onSelectStakeholder] = useState(null);
  // const [viewport, setViewport] = useState({
  //   zoom: defaultLocation.zoom,
  //   latitude: origin.lat,
  //   longitude: origin.lon,
  // });

  // const doSelectStakeholder = (stakeholder) => {
  //   if (stakeholder && !isMobile) {
  //     setViewport({
  //       ...viewport,
  //       latitude: stakeholder.latitude,
  //       longitude: stakeholder.longitude,
  //     });
  //   }
  //   onSelectStakeholder(stakeholder);
  // }

  const switchResultsView = () => {
    doSelectStakeholder();
    setIsMapView(!isMapView);
  };

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      alignContent="stretch"
      spacing={0}
    >
      <Head />
      <Header />
      <Filters origin={origin} setOrigin={setOrigin} />
      <Grid item container spacing={0} className={classes.listMapContainer}>
        {/* {(!isMobile || (isMobile && !isMapView)) && (
          <List
            selectedStakeholder={selectedStakeholder}
            doSelectStakeholder={doSelectStakeholder}
            stakeholders={[]}
            setToast={setToast}
          />
        )} */}
        {(!isMobile || (isMobile && isMapView)) && (
          <MapNoSSR
            origin={origin}
            setOrigin={origin}
            // categoryIds={categoryIds}
            // setToast={setToast}
          />
        )}
      </Grid>
    </Grid>
  );
};
