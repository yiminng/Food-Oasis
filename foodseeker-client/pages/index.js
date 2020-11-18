import { useState } from 'react';
import dynamic from 'next/dynamic'
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx'

import List from 'components/list';
import Details from 'components/stakeholder/details';
import Preview from 'components/stakeholder/preview';
import { useDefaultLocation } from 'hooks/location';
import Layout from 'components/layout'
import useMobile from 'hooks/useMobile';

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

const useMobileStyles = makeStyles((props) => ({
  map: {
    height: props => props.selected ? 'calc(100% - 150px)' : '100%',
    width: '100%',
  },
  preview: {
    width: '100%',
    height: '150px',
    padding: '0 1em',
  },
  details: {
    width: '100%',
    height: '100%',
  },
}));

const DesktopView = ({ stakeholders, onSelectStakeholder, viewport, setViewport, selectedStakeholder }) => {
  const classes = useStyles();
  return (
    <>
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
    </>
  )
}

const MobileView = ({
  stakeholders,
  onSelectStakeholder,
  viewport,
  setViewport,
  selectedStakeholder,
  isMapView,
  setMapView
}) => {
  const classes = useMobileStyles({ selected: !!selectedStakeholder });

  if (isMapView)
    return (
      <>
        <Grid item sm={12} md={8} className={classes.map}>
          <MapNoSSR
            viewport={viewport}
            setViewport={setViewport}
            stakeholders={stakeholders}
            selectedStakeholder={selectedStakeholder}
            onSelectStakeholder={onSelectStakeholder}
          />
        </Grid>
        {!!selectedStakeholder &&
          <Grid item sm={12} md={4} className={classes.preview}>
            <Preview stakeholder={selectedStakeholder} onSelectStakeholder={() => setMapView(false)} />
          </Grid>
        }
      </>
    )
  else
    return (
      <Grid item sm={12} md={4} className={classes.details}>
        {!!selectedStakeholder ?
          <Details stakeholder={selectedStakeholder} onSelectStakeholder={onSelectStakeholder} /> :
          <List
            stakeholders={stakeholders}
            onSelectStakeholder={onSelectStakeholder}
          />
        }
      </Grid>
    )
}

export default function Index({ defaultLocation, stakeholders }) {
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
  const [isMapView, setMapView] = useState(true);
  const isMobile = useMobile();

  const onSelectStakeholder = (stakeholder) => {
    if (stakeholder) {
      setViewport({
        ...viewport,
        height: '100%',
        latitude: stakeholder.latitude,
        longitude: stakeholder.longitude,
      });
    }
    setViewport({
      ...viewport,
      height: '100%',
    });
    selectStakeholder(stakeholder);
  }

  return (
    <Layout origin={origin} setOrigin={setOrigin} isMapView={isMapView} setMapView={setMapView}>
      {isMobile ?
        <MobileView 
          stakeholders={stakeholders}
          onSelectStakeholder={onSelectStakeholder}
          setViewport={setViewport}
          viewport={viewport}
          selectedStakeholder={selectedStakeholder}
          isMapView={isMapView}
          setMapView={setMapView}
        /> : 
        <DesktopView
          stakeholders={stakeholders}
          onSelectStakeholder={onSelectStakeholder}
          setViewport={setViewport}
          viewport={viewport}
          selectedStakeholder={selectedStakeholder}
        />
      }
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
