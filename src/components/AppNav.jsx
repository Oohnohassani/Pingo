import { NavLink, Link } from "react-router-dom";
import styles from "./AppNav.module.css";
import Logo from "./Logo";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { memo } from "react";

function AppNav() {
  return (
    <nav className={styles.appNav}>
      {/*  Logo */}
      {/* <Link to="/">
        <div className={styles.AppNavLogo}>
          <img src={pingo} alt="pingo full logo on the sidebar" />
        </div>
      </Link> */}

      <Tippy content="Go back to home" className={styles.appNavLogoToolTip}>
        <Link to="/">
          <Logo width="10rem" />
        </Link>
      </Tippy>

      {/* Links */}
      <ul>
        <li>
          <NavLink to="places">Places</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default memo(AppNav);
