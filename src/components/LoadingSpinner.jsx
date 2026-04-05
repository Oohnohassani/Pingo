// Imports 📩
import styles from "./LoadingSpinner.module.css";
import Loading from "../assets/Loader.gif";

// Component 🧩
function LoadingSpinner({ fullScreen = false }) {
  return (
    <div
      className={`${styles.loaderWrapper} ${fullScreen ? styles.fullScreen : ""}`}
    >
      <div className={styles.loader}>
        <img src={Loading} alt="loading spinner" draggable="false" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
