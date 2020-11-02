import { useEffect, useState, useRef } from 'react'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles";

import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from 'constants/stakeholder';
import { useDefaultLocation } from 'hooks/location'
import MapIcon from 'icons/map'

const useStyles = makeStyles((theme) => ({
  control: {
    position: 'absolute',
    right: '5px',
    top: '5px',
    zIndex: 2,
  },
  container: {
    display: 'grid',
  },
  zIndex: {
    zIndex: 1,
  },
  map: {
    gridColumn: 1,
    gridRow: 1,
  },
  hidden: {
    visibility: 'hidden',
  },
}));

const MapMarker = ({ onClick, stakeholder, selectedStakeholder }) => {
  const {
    longitude,
    latitude,
    categories,
    inactive,
    inactiveTemporary,
  } = stakeholder;
  const classes = useStyles();
  const selected =
    selectedStakeholder && selectedStakeholder.id === stakeholder.id;

  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      className={clsx({ [classes.zIndex]: selected })}
    >
      <MapIcon
        selected={selected}
        inactive={inactive || inactiveTemporary}
        category={
            categories[0]?.id === FOOD_PANTRY_CATEGORY_ID &&
            categories[1]?.id === MEAL_PROGRAM_CATEGORY_ID
            ? -1
            : categories[0]?.id === FOOD_PANTRY_CATEGORY_ID
            ? 0
            : 1
          }
        />
    </Marker>
  );
};

export default function Map({ origin, setOrigin, stakeholders }) {
  const mapRef = useRef()
  const defaultLocation = useDefaultLocation()

  const classes = useStyles()
  const [showMap, setShowMap] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: origin.lat,
    longitude: origin.lon,
    zoom: defaultLocation.zoom,
    height: '100%',
    width: '100%',
  })

  const handleResize = () => {
    setViewport({
      ...viewport,
      height: '100%',
      width: '100%',
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    const map = mapRef.current.getMap()
    if (map) map.on('load', () => setShowMap(true))
  })

  const width = Math.round(window.innerWidth / 2)
  const height = Math.round(window.innerHeight - 72 - 60)
  const STATIC_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${viewport.longitude},${viewport.latitude},${viewport.zoom},0/${width}x${height}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  return (
    <div className={classes.container}>
      <div className={clsx(classes.map, classes.zIndex, { [classes.hidden]: !showMap })}>
        <ReactMapGL
          ref={mapRef}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11?optimize=true"
          onViewportChange={viewport => setViewport(viewport)}
          {...viewport}
          maxZoom={18}
          minZoom={8}
        >
          <div className={classes.control}>
            <NavigationControl showCompass={false} />
          </div>
          {stakeholders.filter(s => !s.inactive && !s.inactiveTemporary).map(s => <MapMarker key={s.id} stakeholder={s} />)}
        </ReactMapGL>
      </div>
      <div className={clsx(classes.map, { [classes.hidden]: showMap })}>
        <img src={STATIC_URL} width={width} height={height} alt={defaultLocation.name} />
      </div>
    </div>
  )
}
