import { useState } from 'react';
import dynamic from 'next/dynamic'
import { Grid } from "@material-ui/core";

import List from 'components/list';
import { useDefaultLocation } from 'hooks/location';
import useMobile from 'hooks/useMobile';
import Layout from 'components/layout'
import useCategoryIds from 'hooks/useCategoryIds'

// Map need access to the window so has to load client-side
const MapNoSSR = dynamic(
  () => import('components/map'),
  { ssr: false }
)

export default function Index({ defaultLocation, stakeholders }) {
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
    <Layout origin={origin} setOrigin={setOrigin}>
      <Grid item xs={12} md={4}>
        <List stakeholders={stakeholders} />
      </Grid>
      <Grid item xs={12} md={8}>
        {(!isMobile || (isMobile && isMapView)) && (
          <MapNoSSR
            origin={origin}
            setOrigin={origin}
            stakeholders={stakeholders}
          />
        )}
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
