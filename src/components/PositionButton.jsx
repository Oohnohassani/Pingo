import { useEffect, useState } from "react";
import styles from "./positionButton.module.css";

function PositionButton({ position, children }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(function () {
      if (position || !position) setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [position]);

  return (
    <button
      className={`${styles.postionBtn} ${show ? styles.show : ""}`}
      disabled={true}
    >
      {children}
    </button>
  );
}

export default PositionButton;
