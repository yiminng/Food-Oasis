import React, { useEffect, useState, useRef } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import cn from 'classnames'
import Image from 'next/image'

import styles from 'styles/map.module.css'

export default function Map() {
  const mapRef = useRef()

  const [showMap, setShowMap] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 34.0447,
    longitude: -118.2436,
    zoom: 12,
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

  const ACCESS_TOKEN='pk.eyJ1IjoibHVjYXNob21lciIsImEiOiJjazFqcnRjcm0wNmZ1M2JwZXg2eDFzMXd3In0.yYpkKLrFCxF-qyBfZH1a8w'
  const width = window.innerWidth / 2
  const height = window.innerHeight - 50
  const STATIC_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${viewport.longitude},${viewport.latitude},${viewport.zoom}/${width}x${height}?access_token=${ACCESS_TOKEN}`

  return (
    <div className={styles.container}>
      <div className={cn(styles.map, { [styles.hidden]: !showMap })}>
        <ReactMapGL
          ref={mapRef}
          mapboxApiAccessToken={ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11?optimize=true"
          onViewportChange={viewport => setViewport(viewport)}
          {...viewport}
          maxZoom={18}
          minZoom={8}
        >
          <div className={styles.mapControl}>
            <NavigationControl showCompass={false} />
          </div>
        </ReactMapGL>
      </div>
      <div className={styles.mapPlaceholder}>
        <Image src={STATIC_URL} width={width} height={height} alt="Los Angeles" />
      </div>
    </div>
  )
}
