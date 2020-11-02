import { useState } from 'react';
import dynamic from 'next/dynamic'

// import List from 'components/list';
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
  const { categoryIds, toggleCategory } = useCategoryIds([]);

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
      {(!isMobile || (isMobile && isMapView)) && (
        <MapNoSSR
          origin={origin}
          setOrigin={origin}
          stakeholders={stakeholders}
          categoryIds={categoryIds}
          // setToast={setToast}
        />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
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
