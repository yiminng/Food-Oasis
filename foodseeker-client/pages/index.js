import React from 'react';
import { Grid } from "@material-ui/core";

import Head from 'components/head';
import Filters from 'components/filters';
import { useGeolocation, useDefaultLocation } from 'hooks/location';

export default function Index() {
  const geolocation = useGeolocation();
  const defaultLocation = useDefaultLocation();
  console.log(geolocation);
  console.log(defaultLocation);
  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      alignContent="stretch"
      spacing={0}
    >
      <Head />
      <Filters />
    </Grid>
  );
};
