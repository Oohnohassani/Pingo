import styles from "./Form.module.css";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import pingo from ".././assets/Ping0! (small).png";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { Link, useNavigate } from "react-router-dom";
import { FAKE_USER } from "../utils/server";
import { useAuth } from "../contexts/AuthenticationContext";

function Form() {
  // State 🧠
  const [isActive, setIsActive] = useState(false);

  // Signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signin
  const [username, setUsername] = useState(FAKE_USER.username);
  const [userpassword, setUserpassword] = useState(FAKE_USER.password);

  // navigate
  // const navigate = useNavigate();

  // Consume context
  const { logIn } = useAuth();

  // helpers ⚕️
  function handleOverlay(e) {
    e.preventDefault();

    // 1. Toggle state
    setIsActive((c) => !c);

    // 2. Reset states
    setName("");
    setEmail("");
    setPassword("");

    setUsername(FAKE_USER.username);
    setUserpassword(FAKE_USER.password);
  }

  function handleSignin(e) {
    e.preventDefault();

    // after validation, navigate to /app
    logIn(username, userpassword);
    // navigate("/app");
  }

  function handleSignup(e) {
    e.preventDefault();

    // FIXME - To be implemented later!
  }

  return (
    <>
      <Navbar />
      <div className={styles.formwrapper}>
        <div className={styles.form}>
          <form action="#">
            {/* SIGN UP */}
            <div
              className={`${styles.createAccount} ${isActive ? styles.opacity : ""}`}
            >
              <h3>Create an account</h3>

              <div className={styles.icons}>
                <span>{<FaFacebook />}</span>
                <span>{<FaGoogle />}</span>
                <span>{<FaLinkedin />}</span>
              </div>

              <p>or use your email for registration</p>

              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.signup} ${"btn"}`}
                onClick={(e) => handleSignup(e)}
              >
                Signup
              </button>
            </div>

            {/* SIGN IN */}
            <div
              className={`${styles.signinAccount}  ${!isActive ? styles.opacity : ""}`}
            >
              <h3>Signin to ⚡Oohnohassani⚡</h3>
              <div className={styles.icons}>
                <span>
                  <a
                    href="https://www.instagram.com/oohnohassani/"
                    target="_blank"
                  >
                    {<FaInstagram />}
                  </a>
                </span>
                <span>
                  <a href="https://github.com/Oohnohassani" target="_blank">
                    {<FaGithub />}
                  </a>
                </span>
                <span>
                  <a
                    href="https://www.linkedin.com/in/abdirahman-hassani-7b043032a/"
                    target="_blank"
                  >
                    {<FaLinkedin />}
                  </a>
                </span>
              </div>

              <p>use ⚡oohnohassani⚡'s account</p>

              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  readOnly
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={userpassword}
                  onChange={(e) => setUserpassword(e.target.value)}
                  readOnly
                />
              </div>

              <button
                type="submit"
                className={`${styles.signin} ${"btn"}`}
                onClick={(e) => handleSignin(e)}
              >
                Signin
              </button>
            </div>

            {/* OVERLAY */}
            <div
              className={`${styles.overlay} ${!isActive ? styles.isActive : ""}`}
            >
              <div className={styles.logo}>
                <img src={pingo} alt="pingo logo" draggable="false" />
              </div>

              <h3>
                {!isActive
                  ? "Welcome back ⚡Oohnohassani⚡"
                  : "Hello there 👋 my friend!"}
              </h3>

              <p>
                {!isActive
                  ? "Sign in to continue your journey and access your account."
                  : "Enter your details and start your journey with us today."}
              </p>

              <button
                type="submit"
                className={styles.signup}
                onClick={(e) => handleOverlay(e)}
              >
                {isActive ? "Signup" : "Signin"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Form;
