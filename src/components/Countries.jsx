// Import 📩
import { usePlaces } from "../contexts/PlacesContext";
import styles from "./Countries.module.css";
import Country from "./Country";
import LoadingSpinner from "./LoadingSpinner";
import Welcome from "./Welcome";

// Component 🧩
function Countries() {
  // Consume context
  const { places, isLoading } = usePlaces();

  // Derived State 🧠 - Unique countries
  let countriesArr = [];

  places.map((place) => {
    // 1. Check if place exists in our countries array
    const exists = countriesArr.some(
      (country) => country.country === place.country,
    ); // true or false

    // If not, add it to our countries array
    if (!exists) {
      countriesArr.push(place);
    }
  });

  // console.log("⚡ countries: ", countriesArr);

  if (isLoading) return <LoadingSpinner />;

  if (places.length === 0) return <Welcome />;

  return (
    <div className={styles.countries}>
      <div className={styles.countryWrapper}>
        {countriesArr.map((place) => (
          <Country country={place} key={place.id} />
        ))}
      </div>
    </div>
  );
}

export default Countries;

/*
 NOTE: To looop through two arrays of objects and compare the properties of the objects, do this:
 

*/
