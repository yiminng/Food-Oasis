import { useReducer } from "react";
import axios from "axios";
import debounce from "debounce-fn";

import defaultLocations from 'constants/location';

const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;

const initialState = {
  isLoading: false,
  error: false,
  mapboxResults: [],
};

const actionTypes = {
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false,
        mapboxResults: action.results,
      };
    case actionTypes.FETCH_FAILURE:
      console.log(action.error);
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
}

const buildBounds = (bounds) => 
  `${bounds.minLon}, ${bounds.minLat}, ${bounds.maxLon}, ${bounds.maxLat}`;

export function useMapboxGeocoder() {
  const [{ isLoading, error, mapboxResults }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  const fetchMapboxResults = debounce(
    async (searchString) => {
      const bbox =
        tenantId === 3
          ? buildBounds(defaultLocations.hawaii.bounds)
          : tenantId === 2
          ? buildBounds(defaultLocations.california.bounds)
          : buildBounds(defaultLocations.losAngeles.bounds);

      const mapboxUrl = `${baseUrl}/${searchString}.json?bbox=${bbox}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

      dispatch({ type: actionTypes.FETCH_REQUEST });
      try {
        const response = await axios.get(mapboxUrl);
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          results: response.data.features,
        });
      } catch (error) {
        dispatch({ type: actionTypes.FETCH_FAILURE, error });
      }
    },
    { wait: 300 }
  );

  return { error, isLoading, mapboxResults, fetchMapboxResults };
}
