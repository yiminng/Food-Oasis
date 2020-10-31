import React, { useEffect, useState, useRef } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import { Grid } from "@material-ui/core";
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles";
import Image from 'next/image'

import theme from 'theme'
import { useDefaultLocation } from 'hooks/location'

const useStyles = makeStyles((theme) => ({
  control: {
    position: 'absolute',
    right: '5px',
    top: '5px',
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

export default function Map({ origin, setOrigin }) {
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

  const width = window.innerWidth / 2
  const height = window.innerHeight - 72-60
  const STATIC_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-118.2439,34.0355,12,0/562x920?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

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
        </ReactMapGL>
      </div>
      <div className={clsx(classes.map, { [classes.hidden]: showMap })}>
        <img src={STATIC_URL} width={width} height={height} alt={defaultLocation.name} />
      </div>
    </div>
  )
}
