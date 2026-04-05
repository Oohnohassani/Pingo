// Imports 📩
import styles from "./Modal.module.css";
import { LuGithub, LuInstagram, LuLinkedin } from "react-icons/lu";
import oohnohassani from "../assets/oohnohassani.png";
import { useEffect, useRef } from "react";

// Component 🧩
function Modal({ showModal, setShowModal }) {
  // Helpers ⚕️
  function handleCloseModal() {
    setShowModal(false);
  }

  // Ref
  const modalRef = useRef(null);

  // Effects 🌀
  useEffect(function () {
    // Close modal if clicked outside
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    }

    // Close the modal if 'Esc' is pressed
    function handleKeyPress(e) {
      if (e.code === "Escape") {
        setShowModal(false);
      }
    }

    // Events 🖱️
    document.documentElement.addEventListener("click", handleOutsideClick);
    document.documentElement.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return function () {
      document.documentElement.removeEventListener("click", handleOutsideClick);
      document.documentElement.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={`${styles.modalWrapper} ${showModal ? styles.modalWrapperActive : ""}`}
    >
      <div className={styles.modalContainer}>
        {/* Modal */}
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.modalImage}>
            <div>
              <img src={oohnohassani} alt="oohnohassani" draggable="false" />
            </div>
          </div>

          <div className={styles.modalContent}>
            <h2>Howdy!</h2>

            <p>
              Thank you so much for getting here! I’m Hassani, creator and
              maintainer of <span>Pingo</span>. I’d really love to get in touch
              with you to hear your feedback or just say hello! 😃
            </p>

            <h4>REACH ME ON</h4>

            <div className={styles.icons}>
              <span>
                <a
                  href="https://www.instagram.com/oohnohassani/"
                  target="_blank"
                >
                  {<LuInstagram />}
                </a>
              </span>
              <span>
                <a href="https://github.com/Oohnohassani" target="_blank">
                  {<LuGithub />}
                </a>
              </span>
              <span>
                <a
                  href="https://www.linkedin.com/in/abdirahman-hassani-7b043032a/"
                  target="_blank"
                >
                  {<LuLinkedin />}
                </a>
              </span>
            </div>

            {/* Close button */}
            <button className={styles.closeBtn} onClick={handleCloseModal}>
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
