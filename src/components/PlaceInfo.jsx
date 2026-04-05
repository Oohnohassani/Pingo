import { useNavigate, useParams } from "react-router-dom";
import styles from "./PlaceInfo.module.css";
import { usePlaces } from "../contexts/PlacesContext";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";

function PlaceInfo() {
  // State 🧠
  const [place, setPlace] = useState({});

  // console.log(place.date);

  // Prams
  const { id } = useParams();
  // console.log("Current place id: ", id);

  // Consume context
  const { getPlace, isLoading } = usePlaces();

  // Navigation
  const navigate = useNavigate();

  // Effect 🌀
  useEffect(
    function () {
      async function currentPlace() {
        // 1. Get the current place by it's id
        const place = await getPlace(id);

        // console.log(place); // {...}

        // 2. Update state
        setPlace(place);
      }

      // Call it
      currentPlace();
    },
    [id],
  );

  if (isLoading) return <LoadingSpinner />;

  if (!place || !place.placeName) return;

  return (
    <div className={styles.placeInfo}>
      <div className={styles.place}>
        <h6>Place name</h6>
        <div>
          <span>{place?.placeName}</span>
          <span>{place?.emoji}</span>
        </div>
      </div>

      <div className={styles.date}>
        <h6>You went to {place?.placeName} on</h6>
        <p>{formatDate(place?.date)}</p>
      </div>

      <div className={styles.notes}>
        <h6>Your notes</h6>
        <p>{place?.notes}</p>
      </div>

      <div className={styles.link}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${place?.placeName.toLowerCase()}`}
          target="_blank"
        >
          Check out {place?.placeName.toLowerCase()} on wikipedia &rarr;
        </a>
      </div>

      <button className={styles.backbtn} onClick={() => navigate(-1)}>
        &larr; Back
      </button>
    </div>
  );
}

export default PlaceInfo;
