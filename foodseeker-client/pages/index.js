import { useState } from 'react';
import dynamic from 'next/dynamic'
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx'

import List from 'components/list';
import Details from 'components/stakeholder/details';
import { useDefaultLocation } from 'hooks/location';
import Layout from 'components/layout'
// Map need access to the window so has to load client-side
const MapNoSSR = dynamic(
  () => import('components/map'),
  { ssr: false }
)

const useStyles = makeStyles(({ breakpoints }) => ({
  gridItem: {
    height: '100%',
    [breakpoints.down('sm')]: {
      height: '50%',
      width: '100%',
    }
  },
  list: {
    order: 0,
    [breakpoints.down('sm')]: {
      order: 1,
    }
  },
  map: {
    order: 1,
    [breakpoints.down('sm')]: {
      order: 0,
    }
  },
}));

export default function Index({ defaultLocation, stakeholders }) {
  const classes = useStyles();

  const [isMapView, setIsMapView] = useState(true);
  const [origin, setOrigin] = useState({
    lat: defaultLocation.center.lat,
    lon: defaultLocation.center.lon,
  });
  const [selectedStakeholder, selectStakeholder] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: origin.lat,
    longitude: origin.lon,
    zoom: defaultLocation.zoom,
    height: '100%',
    width: '100%',
  })

  const onSelectStakeholder = (stakeholder) => {
    if (stakeholder) {
      setViewport({
        ...viewport,
        latitude: stakeholder.latitude,
        longitude: stakeholder.longitude,
      });
    }
    selectStakeholder(stakeholder);
  }

  const switchResultsView = () => {
    doSelectStakeholder();
    setIsMapView(!isMapView);
  };

  return (
    <Layout origin={origin} setOrigin={setOrigin}>
      <Grid item sm={12} md={4} className={clsx(classes.list, classes.gridItem)}>
        {!selectedStakeholder &&
          <List
            stakeholders={stakeholders}
            onSelectStakeholder={onSelectStakeholder}
          />
        }
        {!!selectedStakeholder &&
          <Details stakeholder={selectedStakeholder} onSelectStakeholder={onSelectStakeholder} />
        }
      </Grid>
      <Grid item sm={12} md={8} className={clsx(classes.map, classes.gridItem)}>
        <MapNoSSR
          viewport={viewport}
          setViewport={setViewport}
          stakeholders={stakeholders}
          selectedStakeholder={selectedStakeholder}
          onSelectStakeholder={onSelectStakeholder}
        />
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps() {
  const defaultLocation = useDefaultLocation();
  const url = `https://foodoasis.la/api/stakeholderbests?categoryIds[]=1&categoryIds[]=9&latitude=${defaultLocation.center.lat}&longitude=${defaultLocation.center.lon}&distance=${defaultLocation.radius}&isInactive=either&verificationStatusId=0&tenantId=${process.env.NEXT_PUBLIC_TENANT_ID}`
  const res = await fetch(url)
  const stakeholders = await res.json()
  return {
    props: {
      defaultLocation,
      stakeholders,
    },
  }
}
