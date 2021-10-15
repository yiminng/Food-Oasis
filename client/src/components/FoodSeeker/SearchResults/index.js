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

  const [name, setName] = useState("");
  const [radius, setRadius] = useState(1);
  const [isInactive, setIsInactive] = useState("either");
  const [verificationStatusId, setVerificationStatusId] = useState(0);
  const { categoryIds, toggleCategory } = useCategoryIds([]);
  let zoom = defaultViewport.zoom;
  let dimensions = { width: 1000, height: 800 };
  if (mapRef && mapRef.current) {
    const vp = mapRef.current.getViewport();
    zoom = vp.zoom;
    dimensions = vp.dimensions;
  }
  const bounds = getMapBounds(origin, zoom, dimensions);
  const { minLat, maxLat, minLng, maxLng } = bounds;

  // const criteria = {
  //   name,
  //   longitude,
  //   latitude,
  //   radius,
  //   isInactive,
  //   verificationStatusId,
  //   bounds,
  // };

  const [selectedStakeholderId, setSelectedStakeholderId] = useState(null);
  const [isVerifiedSelected, selectVerified] = useState(false);
  const [showList, setShowList] = useState(true);

  const {
    stakeholders,
    selectedStakeholder,
    loading,
    search,
    setSelectedStakeholderById,
  } = useFoodSeeker();

  // If any of the search criteria change, re-execute the query
  useEffect(() => {
    function execute() {
      if (
        origin.longitude &&
        origin.latitude &&
        radius &&
        maxLat > minLat &&
        maxLng > minLng
      ) {
        const criteria = {
          name,
          longitude: origin.longitude,
          latitude: origin.latitude,
          radius,
          isInactive,
          verificationStatusId,
          categoryIds,
          bounds: { minLat, maxLat, minLng, maxLng },
        };
        search(criteria);
        //analytics.postEvent("searchArea", criteria);
      }
    }
    execute();
  }, [
    name,
    origin.latitude,
    origin.longitude,
    radius,
    isInactive,
    verificationStatusId,
    categoryIds,
    minLat,
    maxLat,
    minLng,
    maxLng,
    search,
  ]);

  // If we read the selectedStakeholderId from the query String Parameter "id" and it is
  // new or different, then select the new stakeholder from stakeholders.
  // useEffect(() => {
  //   function execute() {
  //     const urlSearchParams = new URLSearchParams(location.search);
  //     const id = Number(urlSearchParams.get("id"));
  //     if ((!id && !selectedStakeholderId) || id !== selectedStakeholderId) {
  //       console.log(
  //         `selecting stakeholder, id = ${id} selectedStakeholderId = ${JSON.stringify(
  //           selectedStakeholderId,
  //           null,
  //           2
  //         )}`
  //       );
  //       const newStakeholder = setSelectedStakeholderById(id);
  //       setSelectedStakeholderId(id);
  //       setOrigin({
  //         latitude: newStakeholder.latitude,
  //         longitude: newStakeholder.longitude,
  //       });
  //       return;
  //     }
  //   }
  //   console.log("starting deep link effect");
  //   execute();
  //   console.log("ending deep link effect");
  // }, [
  //   location.search,
  //   setSelectedStakeholderById,
  //   selectedStakeholderId,
  //   setSelectedStakeholderId,
  //   setOrigin,
  // ]);

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

  // useEffect(() => {
  //   function execute() {
  //     if (!criteria || !criteria.latitude || !criteria.longitude) return;
  //     const newOrigin = {
  //       latitude: criteria.latitude,
  //       longitude: criteria.longitude,
  //     };
  //     if (JSON.stringify(origin) !== JSON.stringify(newOrigin)) {
  //       setOrigin({
  //         latitude: criteria.latitude,
  //         longitude: criteria.longitude,
  //       });
  //     }
  //   }
  //   console.log(
  //     "starting food seeker effect  " +
  //       JSON.stringify(criteria) +
  //       JSON.stringify(origin)
  //   );
  //   execute();
  //   console.log("ending food seeker effect");
  // }, [criteria, setOrigin, origin]);

  // useEffect(() => {
  //   function execute() {
  //     const { zoom, dimensions } = mapRef.current.getViewport();

  //     const criteria = {
  //       latitude: origin.latitude,
  //       longitude: origin.longitude,
  //       bounds: getMapBounds(origin, zoom, dimensions),
  //       categoryIds,
  //       isInactive: "either",
  //       verificationStatusId: 0,
  //     };
  //     search(criteria);
  //     analytics.postEvent("searchArea", criteria);
  //   }
  //   execute();
  // }, [origin, categoryIds, search]);

  const searchMapArea = useCallback(() => {
    const { center } = mapRef.current.getViewport();
    // setLatitude(center.latitude);
    // setLongitude(center.longitude);
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
      setSelectedStakeholderId(stakeholder.id);
      setSelectedStakeholderById(stakeholder.id);
      history.push(
        `/organizations?id=${stakeholder.id}&org=${stakeholder.name}`
      );
    } else {
      setSelectedStakeholderId(0);
      setSelectedStakeholderById(null);
      history.push(`/organizations`);
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

  if (isDesktop)
    return (
      <>
        <Desktop filters={filters} map={map} list={list} />
        {/* <pre>
          {JSON.stringify(
            { origin, latitude, longitude, dimensions, bounds },
            null,
            2
          )}
        </pre> */}
      </>
    );

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
