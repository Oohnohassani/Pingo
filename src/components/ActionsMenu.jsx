// Imports 📩
import { memo, useState } from "react";
import styles from "./ActionsMenu.module.css";
import {
  LuSparkles,
  LuSlidersHorizontal,
  LuCircleHelp,
  LuLogOut,
  LuChevronRight,
  LuSettings,
  LuFileText,
  LuBug,
  LuDownload,
  LuKeyboard,
  LuLifeBuoy,
  LuArrowUpLeft,
} from "react-icons/lu";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useAuth } from "../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

// Component 🧩
function ActionsMenu() {
  // State 🧠
  const [showOptions, setShowOptions] = useState(false);

  // Consume context
  const { logOut } = useAuth();

  // Navigate
  const navigate = useNavigate();

  // Helpers ⚕️
  function handleNavigation() {
    navigate("/comingsoon");
  }

  return (
    <div className={styles.ActionsMenu}>
      <div className={styles.actions}>
        {/* User */}
        <div className={styles.user}>
          <div className={styles.userDetails}>
            <div className={styles.userProfile}>
              <img
                draggable="false"
                src="https://i.pravatar.cc/300?img=57"
                alt="profile picture"
              />
            </div>

            <div className={styles.userInfo} onClick={handleNavigation}>
              <h6>⚡oohnohassani⚡</h6>
              <p>@oohnohassani.io</p>
            </div>
          </div>
        </div>

        <div className={styles.boderTop}>
          <div className={styles.action} onClick={handleNavigation}>
            <span>
              <LuSparkles />
            </span>
            <span>Upgrade plan</span>
          </div>
        </div>

        <div className={styles.action} onClick={handleNavigation}>
          <span>
            <LuSlidersHorizontal />
          </span>
          <span>Personalization</span>
        </div>

        <div className={styles.action} onClick={handleNavigation}>
          <span>
            <LuSettings />
          </span>
          <span>Settings</span>
        </div>

        {/* Special help link */}
        <div
          className={styles.boderTop}
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <div
            className={`${styles.action} ${styles.helpAction}`}
            onClick={() => setShowOptions(true)}
          >
            <div className={styles.help}>
              <span>
                <LuLifeBuoy />
              </span>
              <span>Help</span>
            </div>

            <div className={styles.chevronRightIcon}>
              <LuChevronRight />
            </div>
          </div>

          {/* Extra help links */}
          {showOptions && <OtherHelpLinks />}
        </div>

        <Tippy
          content={
            <p className={styles.keyboardShortCuts}>
              <span>Ctrl</span>+<span>Alt</span>+<span>L</span>
            </p>
          }
        >
          <div className={styles.action}>
            <span>
              <LuLogOut />
            </span>
            <button
              onClick={() => {
                // console.log("Logging out...");
                logOut();
              }}
            >
              Logout
            </button>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

//  Extra help links 🧩
function OtherHelpLinks() {
  // State 🧠

  // Navigation
  const navigate = useNavigate();

  return (
    <div className={styles.helpActions}>
      <Tippy
        content={
          <p className={styles.keyboardShortCuts}>
            <span>Ctrl</span>+<span>Shift</span>+<span>H</span>
          </p>
        }
      >
        <div className={styles.helpActionsAction}>
          <span>
            <LuCircleHelp />
          </span>
          <span>Help center</span>
        </div>
      </Tippy>

      <Tippy
        content={
          <p className={styles.keyboardShortCuts}>
            <span>Ctrl</span>+<span>O</span>
          </p>
        }
      >
        <div className={styles.helpActionsAction}>
          <span>
            <LuFileText />
          </span>
          <span>Terms & policies</span>
        </div>
      </Tippy>

      <Tippy
        content={
          <p className={styles.keyboardShortCuts}>
            <span>Ctrl</span>+<span>Shift</span>+<span>X</span>
          </p>
        }
      >
        <div
          className={styles.helpActionsAction}
          onClick={() => navigate("/bugreport")}
        >
          <span>
            <LuBug />
          </span>
          <span>Report a bug</span>
        </div>
      </Tippy>

      <Tippy
        content={
          <p className={styles.keyboardShortCuts}>
            <span>Ctrl</span>+<span>Shift</span>+<span>D</span>
          </p>
        }
      >
        <div className={styles.helpActionsAction}>
          <span>
            <LuDownload />
          </span>
          <span>Download apps</span>
        </div>
      </Tippy>

      <Tippy
        content={
          <p className={styles.keyboardShortCuts}>
            <span>Ctrl</span>+<span>P</span>
          </p>
        }
      >
        <div
          className={styles.helpActionsAction}
          onClick={() => navigate("/keyboardshortcuts")}
        >
          <span>
            <LuKeyboard />
          </span>
          <span>Keyboard shortcuts</span>
        </div>
      </Tippy>
    </div>
  );
}

export default memo(ActionsMenu);
