import { useState, useCallback } from "react";
import * as stakeholderService from "../services/stakeholder-best-service";
import * as analytics from "../services/analytics";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";

const sortStakeholders = (a, b) => {
  if (
    (a.inactive || a.inactiveTemporary) &&
    !b.inactive &&
    !b.inactiveTemporary
  ) {
    return 1;
  } else if (
    !a.inactive &&
    !a.inactiveTemporary &&
    (b.inactive || b.inactiveTemporary)
  ) {
    return -1;
  } else {
    return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
  }
};

export default function useFoodSeeker() {
  const [stakeholders, setStakeholders] = useState(null);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [criteria, setCriteria] = useState(null);

  const search = useCallback(
    async ({
      name,
      latitude,
      longitude,
      radius,
      bounds,
      categoryIds,
      isInactive,
      verificationStatusId,
    }) => {
      categoryIds =
        categoryIds && categoryIds.length > 0
          ? categoryIds
          : DEFAULT_CATEGORIES;
      if (!latitude || !longitude) {
        setCriteria({
          name,
          latitude,
          longitude,
          radius,
          bounds,
          categoryIds,
          isInactive,
          verificationStatusId,
        });
        setStakeholders(null);
        setLoading(false);
        setError(true);
        const msg =
          "Call to search function missing latitude and/or longitude parameters";
        console.error(msg);
        return Promise.reject(msg);
      }
      analytics.postEvent("searchFoodSeeker", {
        name,
        latitude,
        longitude,
        radius,
        bounds,
        categoryIds,
        isInactive,
        verificationStatusId,
      });
      try {
        setStakeholders(null);
        setLoading(true);
        setError(false);
        let params = {
          name,
          categoryIds,
          latitude,
          longitude,
          distance: radius,
          isInactive,
          verificationStatusId,
        };
        if (bounds) {
          const { maxLat, maxLng, minLat, minLng } = bounds;
          params = {
            ...params,
            maxLng,
            maxLat,
            minLng,
            minLat,
          };
        }
        const stakeholders = await stakeholderService.search(params);
        stakeholders.sort(sortStakeholders);
        setStakeholders(stakeholders);
        setLoading(false);
        return stakeholders;
      } catch (err) {
        setError(true);
        console.error(err);
        return Promise.reject(err);
      }
    },
    []
  );

  const setSelectedStakeholderById = useCallback(
    async (id) => {
      if (!id) {
        // de-select stakeholder
        setSelectedStakeholder(null);
        return null;
      }
      try {
        if (selectedStakeholder && selectedStakeholder.id === id) {
          // requested stakeholder is already selected, do nothing
          return selectedStakeholder;
        }
        const stakeholderInCurrentList = stakeholders?.find((s) => s.id === id);
        if (stakeholderInCurrentList) {
          setSelectedStakeholder(stakeholderInCurrentList);
          return stakeholderInCurrentList;
        }

        // If we get this far, need to query for requested stakeholder to get
        // search area and broaden criteria to populate list
        setLoading(true);
        setError(false);
        // setSelectedStakeholder(null);

        const sh = await stakeholderService.getById(id);

        // selected stakeholder was not in result set - re-execute search around the selectedStakeholder
        // First, decide how to modify the criteria to include the selected stakeholder
        // Then execute the mofified search.
        // Then find the selectedStakeholder in the  result set.

        const newCriteria = {
          ...criteria,
          latitude: sh.latitude,
          longitude: sh.longitude,
        };

        const shs = await search(newCriteria);
        const match = shs.find((s) => s.id === sh.id);
        setLoading(false);
        setError(false);
        setSelectedStakeholder(match);
        setStakeholders(shs);
        return match;
      } catch (err) {
        setLoading(false);
        setError(true);
        console.error(err);
        return Promise.reject(err);
      }
    },
    [criteria, search, stakeholders, selectedStakeholder]
  );

  return {
    stakeholders,
    selectedStakeholder,
    loading,
    error,
    criteria,
    search,
    setSelectedStakeholderById,
  };
}
