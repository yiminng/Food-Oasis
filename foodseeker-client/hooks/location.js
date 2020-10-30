import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [userCoordinates, setUserCoordinates] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            const userCoordinates = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
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
      return { lat: 21.33629, lng: -157.89435 };
    case 2:
      return { lat: 38.576711, lng: -121.493671 };
    default:
      return { lat: 34.07872, lng: -118.243328 };
  }
};
