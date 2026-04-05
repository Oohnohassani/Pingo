// Import 📩
import styles from "./Places.module.css";
import { usePlaces } from "../contexts/PlacesContext";
import Place from "./Place";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Welcome from "./Welcome";

// Component 🧩
function Places() {
  // Consume context
  const { places, isLoading } = usePlaces();
  // console.log(places);

  if (isLoading) return <LoadingSpinner />;

  if (places.length === 0) return <Welcome />;

  return (
    <div className={styles.places}>
      {/* Place */}
      {places.map((place) => (
        <Place place={place} key={place.id} />
      ))}

      <Outlet />
    </div>
  );
}

export default Places;
