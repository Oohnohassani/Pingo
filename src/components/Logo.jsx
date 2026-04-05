import styles from "./Logo.module.css";
import logo from "../assets/Pin-n-go!.png";

function Logo({ width = "128px", cursor = "pointer" }) {
  return (
    <div className={styles.logo} style={{ width: width, cursor: cursor }}>
      <img src={logo} alt="pingo logo" draggable="false" />
    </div>
  );
}

export default Logo;
