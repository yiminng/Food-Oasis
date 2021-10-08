import React, { useState, useCallback, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import useFoodSeeker from "hooks/useFoodSeeker";
import useCategoryIds from "hooks/useCategoryIds";
import useBreakpoints from "hooks/useBreakpoints";
import { getMapBounds } from "helpers";
import { defaultViewport } from "helpers/Configuration";
import { Mobile, Tablet, Desktop } from "./layouts";
import Filters from "./Filters";
import Map from "./Map";
import List from "./List";
import Preview from "./Preview";
import Details from "./Details";
import * as analytics from "services/analytics";

const ResultsContainer = ({
  origin,
  setOrigin,
  userCoordinates,
  setToast,
  taglineText,
  location,
  history,
}) => {
  const mapRef = useRef(null);
  const { isDesktop, isTablet } = useBreakpoints();
  const {
    stakeholders,
    selectedStakeholder,
    loading,
    criteria,
    search,
    setSelectedStakeholderById,
  } = useFoodSeeker();
  const { categoryIds, toggleCategory } = useCategoryIds([]);
  const [isVerifiedSelected, selectVerified] = useState(false);
  const [showList, setShowList] = useState(true);

  // useEffect(() => {
  //   function execute() {
  //     const urlSearchParams = new URLSearchParams(location.search);
  //     const id = Number(urlSearchParams.get("id"));
  //     if (id) {
  //       doSetSelectedStakeholderById(id);
  //       return;
  //     }

  //     const { zoom, dimensions } = mapRef.current.getViewport();
  //     const criteria = {
  //       latitude: origin.latitude,
  //       longitude: origin.longitude,
  //       bounds: getMapBounds(origin, zoom, dimensions),
  //       categoryIds,
  //       isInactive: "either",
  //       verificationStatusId: 0,
  //     };
  //     doSearch(criteria);
  //     analytics.postEvent("searchArea", criteria);
  //   }
  //   execute();
  // }, [
  //   origin,
  //   categoryIds,
  //   doSearch,
  //   doSetSelectedStakeholderById,
  //   location.search,
  // ]);

  useEffect(() => {
    function execute() {
      const urlSearchParams = new URLSearchParams(location.search);
      const id = Number(urlSearchParams.get("id"));
      if (
        (!id && selectedStakeholder) ||
        (id && selectedStakeholder?.id !== id)
      ) {
        console.log(
          `selecting stakeholder, id = ${id} selectedStakeholder = ${JSON.stringify(
            selectedStakeholder,
            null,
            2
          )}`
        );
        setSelectedStakeholderById(id);
        return;
      }
    }
    console.log("starting deep link effect");
    execute();
    console.log("ending deep link effect");
  }, [location.search, setSelectedStakeholderById, selectedStakeholder]);

  useEffect(() => {
    function execute() {
      if (!criteria || !criteria.latitude || !criteria.longitude) return;
      const newOrigin = {
        latitude: criteria.latitude,
        longitude: criteria.longitude,
      };
      if (JSON.stringify(origin) !== JSON.stringify(newOrigin)) {
        setOrigin({
          latitude: criteria.latitude,
          longitude: criteria.longitude,
        });
      }
    }
    console.log(
      "starting food seeker effect  " +
        JSON.stringify(criteria) +
        JSON.stringify(origin)
    );
    execute();
    console.log("ending food seeker effect");
  }, [criteria, setOrigin, origin]);

  useEffect(() => {
    function execute() {
      const { zoom, dimensions } = mapRef.current.getViewport();

      const criteria = {
        latitude: origin.latitude,
        longitude: origin.longitude,
        bounds: getMapBounds(origin, zoom, dimensions),
        categoryIds,
        isInactive: "either",
        verificationStatusId: 0,
      };
      search(criteria);
      analytics.postEvent("searchArea", criteria);
    }
    execute();
  }, [origin, categoryIds, search]);

  const searchMapArea = useCallback(() => {
    const { center } = mapRef.current.getViewport();
    setOrigin(center);
  }, [setOrigin]);

  const resetOrigin = useCallback(() => {
    setOrigin(userCoordinates || defaultViewport.center);
  }, [setOrigin, userCoordinates]);

  const toggleShowList = useCallback(() => {
    setSelectedStakeholderById(null);
    setShowList((showList) => !showList);
  }, [setSelectedStakeholderById]);

  const doSelectStakeholder = (stakeholder) => {
    const searchParams = new URLSearchParams(location.search);
    if (stakeholder) {
      searchParams.set("id", stakeholder.id);
      searchParams.set(
        "name",
        stakeholder.name.toLowerCase().replaceAll(" ", "_")
      );
      history.push(
        `/organizations?id=${stakeholder.id}&org=${stakeholder.name}`
      );
      setSelectedStakeholderById(stakeholder.id);
    } else {
      history.push(`/organizations`);
      setSelectedStakeholderById(null);
    }
  };

  const filters = (
    <Filters
      origin={origin}
      setOrigin={setOrigin}
      toggleCategory={toggleCategory}
      categoryIds={categoryIds}
      isVerifiedSelected={isVerifiedSelected}
      selectVerified={selectVerified}
      userCoordinates={userCoordinates}
      showList={showList}
      toggleShowList={toggleShowList}
      taglineText={taglineText}
    />
  );

  const map = (
    <Map
      ref={mapRef}
      center={origin}
      stakeholders={stakeholders}
      doSelectStakeholder={doSelectStakeholder}
      selectedStakeholder={selectedStakeholder}
      categoryIds={categoryIds}
      loading={loading}
      searchMapArea={searchMapArea}
    />
  );

  const list = (
    <List
      selectedStakeholder={selectedStakeholder}
      doSelectStakeholder={doSelectStakeholder}
      stakeholders={stakeholders || []}
      setToast={setToast}
      loading={loading}
      handleReset={resetOrigin}
    />
  );

  if (isDesktop) return <Desktop filters={filters} map={map} list={list} />;

  if (isTablet) return <Tablet filters={filters} map={map} list={list} />;

  return (
    <Mobile
      filters={filters}
      map={map}
      list={showList && list}
      preview={
        selectedStakeholder && (
          <Preview
            doSelectStakeholder={doSelectStakeholder}
            stakeholder={selectedStakeholder}
          />
        )
      }
      details={
        selectedStakeholder && (
          <Details
            selectedStakeholder={selectedStakeholder}
            onClose={doSelectStakeholder.bind(null, null)}
            setToast={setToast}
          />
        )
      }
    />
  );
};

export default withRouter(ResultsContainer);
