// Imports 📩
import styles from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";

// Welcoming page
function Welcome() {
  // Navigate
  const navigate = useNavigate();

  // Helpers ⚕️
  function handleNavigation() {
    navigate("/product");
  }

  return (
    <div className={styles.welcomePage}>
      <h5>
        Welcome to <span>Pingo</span> 👋
      </h5>

      <p>
        Your journey starts here. Click anywhere on the map to pin a place 📍,
        add locations you love, and keep track of the countries you’ve explored.
        Every pin tells a story—start building yours today!
      </p>

      <button
        className={`btn ${styles.learnMoreBtn}`}
        onClick={handleNavigation}
      >
        Learn more <span>&rarr;</span>
      </button>
    </div>
  );
}

export default Welcome;
