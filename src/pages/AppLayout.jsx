// Imports 📩
import { memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "./AppLayout.module.css";
import pingo from "../assets/Ping0! (small).png";
import { LuPanelLeftOpen } from "react-icons/lu";
import { LuPanelLeftClose } from "react-icons/lu";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import AppNav from "../components/AppNav";
import { Outlet, useNavigate } from "react-router-dom";
import Map from "../components/Map";
import User from "../components/User";
import ActionsMenu from "../components/ActionsMenu";
import { useAuth } from "../contexts/AuthenticationContext";
import Modal from "../components/Modal";

// Component 🧩
function AppLayout() {
  // State 🧠
  const [isOpen, setIsOpen] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Consume context
  const { logOut } = useAuth();

  // Navigate
  const navigate = useNavigate();

  // Ref
  const menuRef = useRef(null);

  // Effects 🌀

  // Logout keyboard shortcut
  useEffect(
    function () {
      // Keyboard events

      // 1. Ctrl + P →  Keyboardshortcuts page
      function handleKeyboardShortcut(e) {
        if (e.ctrlKey && e.key.toLowerCase() === "p") {
          e.preventDefault(); // IMPORTANT: stops browser print dialog (Pre-ordained behaviour of the browser)
          console.log("Key pressed: ", e.key);
          console.log(e);

          // Navigate if the keys are `Ctrl + P`
          navigate("/keyboardshortcuts");
        }
      }

      // 2. Logout shortcut
      function handleLogout(e) {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "l") {
          console.log("You logged out...");

          // set the isAuthenticated state back to false and navigate back to home ('/')
          logOut();
        }
      }

      // --- IGNORE ---

      // e.key → what the user actually typed (best for most cases)
      // e.code → physical key on the keyboard (less commonly needed)

      // Select elements
      document.documentElement.addEventListener(
        "keydown",
        handleKeyboardShortcut,
      );

      document.documentElement.addEventListener("keydown", handleLogout);

      // Cleanup functions
      return function () {
        // Remove event listeners
        document.documentElement.removeEventListener(
          "keydown",
          handleKeyboardShortcut,
        );

        document.documentElement.removeEventListener("keydown", handleLogout);
      };
    },
    [navigate, logOut],
  );

  // Actions menu keyboard shortcut
  useEffect(function () {
    // 1. Keyboard event
    function handleShowActionsMenu(e) {
      // Close with Escape
      if (e.key === "Escape") {
        setIsActionsOpen(false);
      }

      // Toggle with Ctrl + K
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsActionsOpen((prev) => !prev);
      }
    }

    document.documentElement.addEventListener("keydown", handleShowActionsMenu);

    // NOTE: Escape is NOT detected by keypress. 👉 keypress is only for printable characters (letters, numbers, symbols)

    // 2. Mouse event
    function handleClickOutside(e) {
      // If menu exists AND click is outside of it
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsActionsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // cleanup
    return function () {
      document.documentElement.removeEventListener(
        "keydown",
        handleShowActionsMenu,
      );

      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sidebar keyboard shortcut
  useEffect(function () {
    function handleOpenSidebar(e) {
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    }

    // Events
    document.documentElement.addEventListener("keydown", handleOpenSidebar);

    // Cleanup
    return function () {
      document.documentElement.removeEventListener(
        "keydown",
        handleOpenSidebar,
      );
    };
  }, []);

  // Plces and Countries keyboard shortcut
  useEffect(
    function () {
      // 1. Places keyboard shortcut
      function handlePlaces(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "p") {
          navigate("places");
        }
      }

      // 2. Countries keyboard shortcut
      function handleCountries(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
          e.preventDefault(); // prevent default browser behaviours
          navigate("countries");
        }
      }

      // Events
      document.addEventListener("keydown", handlePlaces);
      document.addEventListener("keydown", handleCountries);

      // Cleanup
      return function () {
        document.removeEventListener("keydown", handlePlaces);
        document.removeEventListener("keydown", handleCountries);
      };
    },
    [navigate],
  );

  // Comingsoon keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key?.toLowerCase();

      const isCtrl = e.ctrlKey;
      const isAlt = e.altKey;
      const isShift = e.shiftKey;

      // 1. Ctrl + Alt + U
      if (isCtrl && isAlt && key === "u") {
        navigate("/comingsoon");
      }

      // 2. Ctrl + Alt + P
      if (isCtrl && isAlt && key === "p") {
        navigate("/comingsoon");
      }

      // 3. Ctrl + S
      if (isCtrl && key === "s") {
        e.preventDefault(); // prevent browser save
        navigate("/comingsoon");
      }

      // 4. Ctrl + Shift + D
      if (isCtrl && isShift && key === "d") {
        e.preventDefault(); // prevent browser
        navigate("/comingsoon");
      }

      // 5. Ctrl + Shift + X
      if (isCtrl && isShift && key === "x") {
        e.preventDefault(); // prevent browser
        navigate("/bugreport");
      }

      // 6. Ctrl + Shift + H
      if (isCtrl && isShift && key === "h") {
        navigate("/comingsoon");
      }

      // 7. Alt + Ctrl + s
      if (isAlt && isCtrl && key === "s") {
        e.preventDefault(); // prevent windows behaviour
        navigate("/comingsoon");
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup 🧹
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  // Show modal 30% of the time
  useEffect(function () {
    // Set setShowModal to true 1/3 times
    const randomNum = Math.random(); // 0 - 1
    if (randomNum < 0.3) {
      setTimeout(() => setShowModal(true), 15000); // 15s
    }

    // Also show it if the user spends 3mins on our page
    setTimeout(() => setShowModal(true), 300_000); // 5mins
  }, []);

  //  Helpers ⚕️
  const handleToggleSidebar = useCallback(function handleToggleSidebar() {
    setIsOpen((currState) => !currState);
  }, []);

  return (
    <div className={`${styles.app} ${isOpen ? styles.isOpen : ""}`}>
      {/* 0. MODAL */}
      {/* {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />} */}

      {/* Note: For animations to work, the element MUST always be rendered and so we will hide and show based on css active class within the modal instead of state! 😁 */}
      <Modal showModal={showModal} setShowModal={setShowModal} />

      {/* 1. SIDEBAR */}
      <div className={`${styles.sidebar}`}>
        {/* Toggle button */}
        <SidebarToggle
          isOpen={isOpen}
          handleToggleSidebar={handleToggleSidebar}
        />

        {/* Navigation */}
        {isOpen && <AppNav />}

        {/* User profile */}
        <div className={styles.userMenu}>
          <User isOpen={isOpen} setIsActionsOpen={setIsActionsOpen} />

          {/* Actions menu */}
          {isActionsOpen && (
            <div className={styles.userActions} ref={menuRef}>
              <ActionsMenu />
            </div>
          )}
        </div>

        {/* i. places & countries */}
        {isOpen && <Outlet />}
      </div>

      {/* 2. MAP */}
      <div className={styles.map}>
        <Map />
      </div>
    </div>
  );
}

// Toggle Component 🧩
const SidebarToggle = memo(function SidebarToggle({
  isOpen,
  handleToggleSidebar,
}) {
  // State 🧠
  const [isHovering, setIsHovering] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  // Effect 🌀
  useEffect(() => {
    let timer;

    if (!isOpen) {
      timer = setTimeout(() => {
        setShowLogo(true);
      }, 500); // delay before logo appears
    } else {
      setShowLogo(false);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <button
      type="button"
      className={styles.panelToggleBtn}
      onClick={handleToggleSidebar}
    >
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering ? (
          isOpen ? (
            <Tippy
              content="Close the sidebar"
              className={styles.sidebarToggleTooltip}
            >
              <LuPanelLeftClose />
            </Tippy>
          ) : (
            <Tippy
              content="Open the sidebar"
              className={styles.sidebarToggleTooltip}
            >
              <LuPanelLeftOpen />
            </Tippy>
          )
        ) : !isOpen && showLogo ? (
          <img src={pingo} alt="logo" className={styles.sidebarLogo} />
        ) : (
          <LuPanelLeftClose />
        )}
      </div>
    </button>
  );
});

export default AppLayout;
