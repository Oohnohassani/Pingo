// Import 📩
import { useState } from "react";
import styles from "./ReportABug.module.css";
import { LuCheck, LuCross } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Demo data
const bugLevels = [
  { level: "Urgent", description: "Everything's broken.", color: "#EF4444" }, // red
  { level: "High", description: "Major feature broken.", color: "#F97316" }, // orange
  { level: "Medium", description: "Annoying, but usable.", color: "#FACC15" }, // yellow
  { level: "Low", description: "Something's a little off.", color: "#22C55E" }, // green
];

// Component 🧩
function ReportABug() {
  // state 🧠
  const [error, setError] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  //   Input state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Derived state
  const numOfPages = 2;

  // Helpers ⚕️
  function handleNextPage() {
    if (!message) {
      setError("Please don't leave any empty fields 😔");
      return;
    }
    setCurrPage(numOfPages);

    setError("");
  }

  function handleNextPrevPage() {
    // if()

    setCurrPage((state) => (numOfPages > state ? numOfPages - state : 1));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (currPage !== numOfPages) return;

    if (!name || !message || (!email && !error)) {
      setError("Please don't leave any empty fields");
      return;
    }

    setError("");

    setTimeout(() => setShowSuccess(true), 1000);
  }

  return (
    <>
      <Navbar />
      <section className={styles.reportABug}>
        <h2>Report a Bug 🐞</h2>

        <div className={styles.bugsWapper}>
          {/* Indicators */}
          <div className={styles.indicators}>
            <div>
              {currPage > 1 ? (
                <span className={styles.check}>{<LuCheck />}</span>
              ) : (
                <span>1</span>
              )}
            </div>

            <span
              className={styles.indicatorsLine}
              style={
                currPage > 1
                  ? { borderTop: "2px solid var(--color-brand--3)" }
                  : {}
              }
            ></span>

            <div>
              <span
                style={
                  currPage === 1
                    ? {
                        border: "1px solid var(--color-dark--2)",
                        color: "var(--color-dark--2)",
                      }
                    : {}
                }
              >
                2
              </span>
            </div>
          </div>

          {/* Form */}
          <form key={currPage} className={styles.formPageContainer}>
            {currPage === 1 ? (
              <PageOne message={message} setMessage={setMessage} />
            ) : (
              <PageTwo
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
              />
            )}

            <div className={styles.btns}>
              {currPage > 1 && (
                <button
                  type="button"
                  className={styles.prevBtn}
                  onClick={handleNextPrevPage}
                >
                  <span>&larr;</span> Previous
                </button>
              )}

              {currPage === 1 ? (
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={handleNextPage}
                >
                  Next <span>&rarr;</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.nextBtn}
                  onClick={handleSubmit}
                  disabled={showSuccess}
                  style={
                    showSuccess ? { opacity: "0.2", cursor: "not-allowed" } : {}
                  }
                >
                  Submit <span>&uarr;</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Messages */}
        {showSuccess && <SuccessMessage />}
        {error && <ErrorMessage error={error} />}
      </section>
      <Footer />
    </>
  );
}

// Component 🧩
function PageOne({ message, setMessage }) {
  return (
    <div className={styles.bugs}>
      <h5>How would you classify the severity of this bug?</h5>
      <div className={styles.listOfBugs}>
        {bugLevels.map((bug) => (
          <div
            key={bug.level}
            className={styles.bug}
            style={{ border: `1px solid ${bug.color}` }}
          >
            <input
              type="radio"
              name="bugLevel"
              style={{ accentColor: bug.color }}
            />
            <div>
              <h6>{bug.level}</h6>
              <p>{bug.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h5>
        Describe the problem you have encountered. Please be as specific as
        possible.
      </h5>
      <textarea
        cols={20}
        rows={10}
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe the bug here..."
        required
      />
      <div className={styles.uploadFile}>
        <input type="file" />
        <span className={styles.plus}>+</span>
        <h5>Attach a file</h5>
      </div>
      <p className={styles.warning}>
        <span>⚠️</span> Choose a file with a type of PNG or JPG JPEG ONLY.
      </p>{" "}
    </div>
  );
}

// Component 🧩
function PageTwo({ name, setName, email, setEmail }) {
  return (
    <div>
      <div className={styles.details}>
        <h5>We will get back to you on provided email.</h5>
        <div className={styles.inputs}>
          <label>
            What is your name?
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            What is your email?
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            How did you hear about us?
            <select>
              <option value="Github">Github</option>
              <option value="X">X</option>
              <option value="Linkedin">Linkedin</option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            What is your gender?
            <div className={styles.genderOptions}>
              <div>
                <span>Male</span>
                <input type="radio" name="gender" value="male" defaultChecked />
              </div>

              <div>
                <span>Female</span>
                <input type="radio" name="gender" value="female" />
              </div>

              <div>
                <span>Other</span>
                <input type="radio" name="gender" value="other" />
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

// Component 🧩
function SuccessMessage() {
  return (
    <div className={styles.successMessage}>
      <div className={styles.message}>
        <span>{<LuCheck />}</span>
        <div>
          <p>Bug report submitted successfully!</p>
          <p>Thank you for helping us improve the app 🎉 </p>
        </div>
      </div>
    </div>
  );
}

// Component 🧩
function ErrorMessage({ error }) {
  return (
    <div className={styles.errorMessage}>
      <div className={styles.message}>
        <span>{<LuCross />}</span>
        <div>
          <p>Bug report failed terribly!</p>
          <p>{error} </p>
        </div>
      </div>
    </div>
  );
}

export default ReportABug;
