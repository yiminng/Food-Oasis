import { useState, useEffect } from 'react';

import defaultLocations from 'constants/location';

export const useGeolocation = () => {
  const [userCoordinates, setUserCoordinates] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            const userCoordinates = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            setUserCoordinates(userCoordinates);
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
  }, []);

  return userCoordinates;
};

export const useDefaultLocation = () => {
  switch (process.env.NEXT_PUBLIC_TENANT_ID) {
    case 3:
      return defaultLocations.hawaii;
    case 2:
      return defaultLocations.california;
    default:
      return defaultLocations.losAngeles;
  }
};
