// Imports 📩
import styles from "./Map.module.css";
import DataForm from "./DataForm";
import Draggable from "react-draggable";
import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import markerIcon from "../assets/marker2.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  // useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { usePlaces } from "../contexts/PlacesContext";
import { formatDate, shorten } from "../utils/helpers";
import { useGeolocation } from "../hooks/useGeolocation";
import PositionButton from "./PositionButton";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// Custom Icon Marker for the map
const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25.5, 34], // size of your marker
  shadowSize: [35, 35], // size of your shadow image
  iconAnchor: [11.75, 34], // tip of the marker (bottom middle)
  shadowAnchor: [12.75, 34], // align shadow tip with marker tip
  popupAnchor: [0, -40], // popup offset
});

// Component 🧩
function Map() {
  // State 🧠
  const [currentPosition, setCurrentPosition] = useState([37.5665, 126.978]);
  const [showForm, setShowForm] = useState(false);

  // Geolocation API
  const { geoLocationPosition } = useGeolocation();
  // console.log("Your position is 📌: ", geoLocationPosition); // [-1.2762932998362289, 36.851253801696565]

  // Ref
  const nodeRef = useRef(null); //  → Refrences Draggable element with Form inside it.
  const markerRefs = useRef({}); //  →  Leaflet marker refs

  // consume context
  const { places, currentActivePlace } = usePlaces();
  // console.log("Current place 📍: ", currentActivePlace.id); // {...}

  // Id Prams
  const { id } = useParams();
  // console.log("Current Id 🔑: ", id); // When we go back, the id become undefined and it doesn't persist hence why we use the currentActivePlace's id.

  // Naviagte function
  const navigate = useNavigate();
  // const location = useLocation();

  // Position lat and lng
  const [searchPrams] = useSearchParams();
  const lat = searchPrams.get("lat");
  const lng = searchPrams.get("lng");

  // Previous state tracking to fallback to incase lat and lng are null
  const prevCoords = useRef([null, null]); // [lat, lng]

  // Set map position on mount
  useEffect(
    function () {
      const timer = setTimeout(function () {
        if (!geoLocationPosition) return;
        setCurrentPosition(geoLocationPosition);
      }, 5000);

      // Clean up
      return function () {
        clearTimeout(timer);
      };
    },
    [geoLocationPosition],
  );

  // Reset ULR and Prams on page reloads --- IMPORTANT ----

  // 1. Complex version 🕸️🎭

  // useEffect(() => {
  //   // Guard clause
  //   if (!location.search) return;

  //   const params = new URLSearchParams(location.search);

  //   const lat = params.get("lat");
  //   const lng = params.get("lng");

  //   console.log("Lat:", lat);
  //   console.log("Lng:", lng);

  //   // If location is availabe, naviagate
  //   if (location.search) {
  //     navigate(location.pathname, { replace: true });

  //     // If we have an active place with coords
  //     // if (
  //     //   currentActivePlace?.position?.lat &&
  //     //   currentActivePlace?.position?.lng
  //     // ) {
  //     //   navigate(
  //     //     `places/${currentActivePlace.id}?lat=${currentActivePlace.position.lat}&lng=${currentActivePlace.position.lng}`,
  //     //     { replace: true },
  //     //   );
  //     // } else {
  //     //   // No active place
  //     //   navigate("places", { replace: true });
  //     // }
  //   }

  //   // Note & Avoid: Do NOT include depedencies because it clears URl's `lat` and `lng` from the active place and you only remain with place `id`. We don't want that effect!
  // }, []); // runs once on mount on purpose

  // 2. Simple version ✨
  // URL cleaner on page load and can be used to clear temporary query prams.

  // useEffect(() => {
  //   navigate(location.pathname, { replace: true });
  //   // navigate("places");
  // }, []); // Runs once on mount (which includes page reload) and Navigates to: /app/places/777772222 (no query params) Only run it if there are query params in URL, otherwise you're navigating for no reason.

  // Change map position according to the clicked place's coords
  useEffect(
    function () {
      // Set coords Ref
      prevCoords.current = [lat, lng];
      // console.log(prevCoords.current[0], prevCoords.current[1]);

      // Update the state when lat and lng change
      if (lat && lng) setCurrentPosition([lat, lng] || prevCoords);
    },
    [lat, lng],
  );

  // Display the marker popup on the active place
  useEffect(() => {
    // Get id 🔑
    // const id = currentActivePlace?.id;

    //Bug: This 👆 causes a lag issue and map lags behind before moving to another position (You need to close the popup first before moving the map), so we opted for the usePrams id instead!

    // Guard clause (`id` comes from the usePrams above 👆)
    if (!id) return;

    // ☝️. OLD WAY
    // const marker = markerRefs.current[id];

    // if (marker) {
    //   marker.openPopup();
    // }

    // ✌️. NEW WAY
    // Delay the function call
    const timer = setTimeout(() => {
      const marker = markerRefs.current[id];

      if (marker) {
        marker.openPopup();
      }
    }, 100); // small delay

    return () => clearTimeout(timer); // clear the timeout in cleaner func

    // BUG: on page reloads React state is reset (currentActivePlace) and Markers are not mounted yet. `markerRefs.current[id]` is often undefined Because markers haven’t been attached to refs yet. Markers mount AFTER the effect. THe effect runs later, after render. 👉 So our effect misses the moment.

    // Fix: Wait until the marker is ready.You need to delay opening until: 1) markers exist ✅  2) refs are filled ✅
  }, [id, places]);

  // Show and hide `form` according to the keyboard events
  useEffect(
    function () {
      // 1. Hide form
      function handleHideForm(e) {
        if (e.key === "Escape") {
          setShowForm(false);

          // Reset URL and prams
          navigate("/app/places", { replace: true }); // Reset the URL and clear params here
        }
      }

      // 2. Show Form -> Only when there's lat and lng
      function handleShowForm(e) {
        if (e.ctrlKey && e.key.toLowerCase() === "f") {
          e.preventDefault();

          if (!lat && !lng) return;

          setShowForm((s) => !s);
        }
      }

      document.documentElement.addEventListener("keydown", handleHideForm);
      document.documentElement.addEventListener("keydown", handleShowForm);

      // Cleanup
      return function () {
        document.documentElement.removeEventListener("keydown", handleHideForm);
        document.documentElement.removeEventListener("keydown", handleShowForm);
      };
    },
    [navigate, lat, lng],
  );

  return (
    // <div className={styles.mapWrapper} onClick={() => setShowForm(true)}>
    <div className={styles.mapWrapper}>
      {/* MAP */}
      <MapContainer
        center={currentPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {places.map((place) => (
          <Marker
            position={[place.position.lat, place.position.lng]}
            zoom={15}
            icon={customIcon}
            key={place.id}
            ref={(el) => {
              if (el) markerRefs.current[place.id] = el;
            }}
          >
            <Popup>
              <div>
                <span>
                  {place.placeName.length > 14
                    ? shorten(place.placeName, 14)
                    : place.placeName}
                  ,{" "}
                  {place.country.length > 9
                    ? shorten(place.country, 9)
                    : place.country}
                </span>
                <span>{place.emoji}</span>
              </div>
              <div>
                <p>Visited on {formatDate(place.date)}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        <DetectMapClick setShowForm={setShowForm} />
        <MoveMapToPosition position={currentPosition} />
      </MapContainer>

      {/* Note: If we tie it to the geoloaction API, it appears and disappears immediately, so we figured wewill do the logic in the button itself */}

      {/* Position button */}
      {/* {!geoLocationPosition && ( */}
      <PositionButton position={geoLocationPosition}>
        {"Gettin your position..."}
      </PositionButton>
      {/* )} */}

      {/* DRAGGABLE FORM */}
      {/* {showForm && (  FIXME*/}
      {showForm && (
        <Draggable
          nodeRef={nodeRef}
          handle=".drag-handle"
          cancel="input, textarea, button"
          defaultPosition={{ x: 20, y: 20 }} // Default positions
          bounds="parent"
        >
          <div ref={nodeRef} className={styles.draggable}>
            <div
              className={styles.closeForm}
              onClick={(e) => {
                e.stopPropagation(); // prevent wrapper double-click from firing
                setShowForm(false);
                navigate("/app/places", { replace: true }); // Reset the URL and clear params here
              }}
            >
              <Tippy
                className={styles.formCloseTooltip}
                content={
                  <p className={styles.keyboardShortCuts}>
                    <span>Ctrl</span>+<span>F</span>
                  </p>
                }
              >
                <span>x</span>
              </Tippy>
            </div>
            <DataForm showForm={showForm} setShowForm={setShowForm} />
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default Map;

// Note: Draggable takes 1 element and it drags it either on x-axis or y-axis within the parent element!

// Component 🧩
function DetectMapClick({ setShowForm }) {
  const navigate = useNavigate();

  useMapEvent({
    click: function (e) {
      navigate(`places?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      setShowForm(true); // Show the form as the map is clicked
    },
  });
}

// Move the map to the clicked position
function MoveMapToPosition({ position }) {
  const map = useMap();
  // map.setView(position, 15); // Important: Use an effect instead for memoization and re-render optimization.

  useEffect(() => {
    map.setView(position, 15);
  }, [position, map]);

  return null; // null instead of jsx!
}

{
  /* <Draggable
  className={styles.draggable}
  nodeRef={nodeRef}
  handle=".drag-handle"
  cancel="input, textarea, button"
  defaultPosition={{ x: 20, y: 20 }}
  // bounds="parent"
>
  <div ref={nodeRef}>
    <DataForm />
  </div>
</Draggable>; */
}

// Green map

{
  /* <TileLayer
  attribution="&copy; OpenMapTiles &copy; OpenStreetMap contributors"
  url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.jpg"
/>; */
}

// Dark grey map

{
  /* <TileLayer
  attribution="&copy; OpenMapTiles &copy; OpenStreetMap contributors"
  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
/>; */
}

// Completely dark map

{
  /* <TileLayer
  attribution="&copy; OpenStreetMap contributors &copy; CARTO"
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
/>; */
}

// White map

{
  /* <TileLayer
  attribution="&copy; OpenStreetMap contributors &copy; CARTO"
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>; */
}

// Custom looking map
{
  /* <TileLayer
  attribution="&copy; OpenStreetMap contributors &copy; CARTO"
  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
/>; */
}

// Pitch black map
{
  /* <TileLayer
  attribution="&copy; OpenStreetMap contributors &copy; CARTO"
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
/>; */
}

// Light and bright voyages map with yellows
{
  /* <TileLayer
  attribution="&copy; OpenStreetMap contributors &copy; CARTO"
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
/>; */
}
