import React from 'react';
import { Grid } from "@material-ui/core";

import Head from 'components/head';
import Filters from 'components/filters';

export default function Index() {
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
}
