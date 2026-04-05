import Logo from "./Logo";
import Button from "./Button";
import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";

function Navbar() {
  // Consume context
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>

        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>

        <Link to={isAuthenticated ? "/app" : "/form"}>
          <Button>Login</Button>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
