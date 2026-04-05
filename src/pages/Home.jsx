import Button from "../components/Button";
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";
import pingo from "../assets/card pingo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";

function Home() {
  // Consume context
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.homepage}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Track Every Journey Capture Every Memory with{" "}
            <i className={styles.pingo}>Pingo!</i>
          </h1>

          <p className={styles.heroDescription}>
            Pingo helps you turn your travels into a living map of memories. Pin
            every place you visit, add personal notes, and keep all your travel
            adventures beautifully organized. Track your journey and relive
            every moment while planning where to go next
          </p>

          <div>
            <Link to={isAuthenticated ? "/app" : "/form"}>
              <button className={`btn primary ${styles.heroButton}`}>
                Start Tracking now <span> → </span>
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.heroImage}>
          <img src={pingo} alt="Travel map preview" />
        </div>
      </section>
    </div>
  );
}

export default Home;
