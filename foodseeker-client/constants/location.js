const defaultLocations = {
  hawaii: {
    name: "Hawaii",
    center: { lat: 21.3101548, lon: -157.8428712 },
    zoom: 12,
    radius: 5,
    bounds: { maxLat: 22.30, maxLon: -154.58, minLat: 18.91, minLon: -160.25 },
  },
  california: {
    name: 'California',
    center: { lat: 38.3949164, lon: -122.7287326 },
    zoom: 10,
    radius: 8,
    bounds: { maxLat: 42.072, maxLon: -114.1723, minLat: 32.4796, minLon: -124.389 },
  },
  losAngeles: {
    name: 'Los Angeles',
    center: { lat: 34.0354899, lon: -118.2439235 },
    zoom: 12.5,
    radius: 4,
    bounds: { maxLat: 34.8233, maxLon: -117.6462, minLat: 33.6988, minLon: -118.9517 },
  },
}

export default defaultLocations;
