// Import 📩
import styles from "./User.module.css";
import Tippy from "@tippyjs/react";
import { memo } from "react";
import "tippy.js/dist/tippy.css";

// Component 🧩
function User({ isOpen, setIsActionsOpen }) {
  return (
    <div className={`${isOpen ? styles.isOpen : ""}`}>
      <Tippy
        className={styles.userTooltip}
        content="👈 user settings"
        arrow={true}
        placement="right"
        delay={[200, 0]}
      >
        <div
          className={styles.userSettings}
          onClick={(e) => {
            e.stopPropagation();
            setIsActionsOpen((s) => !s);
          }}
        >
          <div className={styles.user}>
            {!isOpen ? (
              <div className={styles.userBG}>
                <div className={styles.userProfile}>
                  <img
                    draggable="false"
                    src="https://i.pravatar.cc/300?img=57"
                    alt="profile picture"
                  />
                </div>
              </div>
            ) : (
              <div className={styles.userProfile}>
                <img
                  draggable="false"
                  src="https://i.pravatar.cc/300?img=57"
                  alt="profile picture"
                />
              </div>
            )}

            {isOpen && (
              <div className={styles.userInfo}>
                <h6>⚡oohnohassani⚡</h6>
                <p>Free</p>
              </div>
            )}
          </div>
        </div>
      </Tippy>
    </div>
  );
}

export default memo(User);
