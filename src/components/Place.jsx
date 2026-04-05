import styles from "./Place.module.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { formatDate } from "../utils/helpers";
import { usePlaces } from "../contexts/PlacesContext";
import { shorten } from "../utils/helpers";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Place({ place }) {
  // Consume context
  const { deletePlace, currentActivePlace } = usePlaces();

  // navigate
  const navigate = useNavigate();

  // Check if place is currently 'active' (clicked and info was viewed)
  const isActive = currentActivePlace.id === place.id;

  const maxChars = 9;

  // Helpers ⚕️
  function handleDelete(e) {
    e.stopPropagation(); // Stop the click before it reaches the parent
    e.preventDefault();

    // 👉 Note: Browsers give some elements built-in default behavior (like <a> navigating, <form> submitting, and submit buttons triggering that submission), and e.preventDefault() is used to stop that behavior when you want the click to do something else instead.

    // So in our case, because we’re using a React Router Link (which renders an <a>), clicking the delete button would normally trigger navigation, and e.preventDefault() stops that link’s natural navigation while we delete the city instead.

    // FIXME
    deletePlace(place.id);

    // Navigate 1 step back
    // navigate(-1);
  }

  // Delet a place with keyboard
  useEffect(
    function () {
      function handleDeletePlace(e) {
        if (e.ctrlKey && e.key.toLowerCase() === "d") {
          e.preventDefault();

          // Check if there's an active place
          if (!currentActivePlace) return;

          // Delete active place
          deletePlace(currentActivePlace.id);
        }
      }

      // Events
      document.documentElement.addEventListener("keydown", handleDeletePlace);

      // Cleanup
      return function () {
        document.documentElement.removeEventListener(
          "keydown",
          handleDeletePlace,
        );
      };
    },
    [currentActivePlace, deletePlace],
  );

  return (
    <div
      className={`${styles.place} ${isActive ? styles.active : ""}`}
      key={place.id}
      // onClick={() => console.log("place id is: ", place.id)}
    >
      <Link
        to={`${place.id}?lat=${place.position.lat}&lng=${place.position.lng}`}
      >
        <div className={styles.placeName}>
          <span>{place.emoji}</span>
          <span>
            {place.placeName.length > maxChars
              ? shorten(place.placeName, maxChars)
              : place.placeName}
          </span>
        </div>
        <div className={styles.date}>
          <span>{formatDate(place?.date)}</span>
          <Tippy content="Delete place" className={styles.placeToolTip}>
            <button onClick={handleDelete}>x</button>
          </Tippy>
        </div>
      </Link>
    </div>
  );
}

export default Place;
