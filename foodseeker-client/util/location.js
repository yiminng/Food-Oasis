import defaultLocations from 'constants/location';

export const getGeolocation = async () => {
  let coords;
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
        }
      },
      (error) => {
        console.log(`Getting browser location failed: ${error.message}`);
      }
    );
  } else {
    // If browser location permission is denied, the request is
    // "successful", but the result is null coordinates.
    console.log("Enable location permission to use location-based features.");
  }
  return coords;
};

export const getDefaultLocation = () => {
  switch (process.env.NEXT_PUBLIC_TENANT_ID) {
    case 3:
      return defaultLocations.hawaii;
    case 2:
      return defaultLocations.california;
    default:
      return defaultLocations.losAngeles;
  }
};
