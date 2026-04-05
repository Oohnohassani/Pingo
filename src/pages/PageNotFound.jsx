// Imports 📩
import styles from "./PageNotFound.module.css";
import pingo from "../assets/Ping0! (small).png";
import bg from "../assets/wavy.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Component 🧩
function PageNotFound() {
  // Navigate
  const navigate = useNavigate();

  // Helpers ⚕️
  function handleGoBack() {
    navigate("/");
  }

  return (
    <>
      <Navbar />
      <section className={styles.pageNotFound}>
        <div className={styles.heading}>
          <p>You look a little lost...</p>
          <h4>
            <span>Oops!</span> Page not found 😫
          </h4>
        </div>

        <div className={styles.fourOfour}>
          <h1>4</h1>
          <div>
            <img src={pingo} alt="pingo logo" draggable="false" />
          </div>
          <h1>4</h1>
        </div>

        <p className={styles.info}>
          The page you're looking for doesn't exist or is gone. Makes sense
          because I ate it. I'm not joking 🙄
        </p>

        <button onClick={handleGoBack}>
          <span>&larr;</span> Go back home
        </button>

        {/* Background Image */}
        <div className={styles.bg}>
          <img src={bg} alt="Background image" draggable="false" />
        </div>

        <div className={styles.footer}>
          <Footer bgColor="transparent" />
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
