// Imports 📩
import styles from "./KeyboardShortcuts.module.css";
import Logo from "./Logo";
import pingo from "../assets/Pin-n-go!.png";
import Footer from "./Footer";

// DEMO DATA
const shortcuts = [
  { label: "All Shortcuts", keys: ["Ctrl", "P"] },
  { label: "Open Sidebar", keys: ["Ctrl", "B"] },
  { label: "Open Sidebar", keys: ["Ctrl", "Shift", "B"] },
  { label: "Close Sidebar", keys: ["Ctrl", "B"] },
  { label: "Close Sidebar", keys: ["Ctrl", "Shift", "B"] },
  { label: "Help Center", keys: ["Ctrl", "Shift", "H"] },
  { label: "Close Actions Menu", keys: ["Esc", "."] },
  { label: "Report A Bug", keys: ["Ctrl", "Shift", "X"] },
  { label: "Settings", keys: ["Ctrl", "S"] },
  { label: "Countries", keys: ["Ctrl", "Shift", "C"] },
  { label: "Terms & Policies", keys: ["Ctrl", "O"] },
  { label: "Open Actions Menu", keys: ["Ctrl", "K"] },
  { label: "Close Actions Menu", keys: ["Ctrl", "K"] },
  { label: "Close Form", keys: ["Ctrl", "F"] },
  { label: "Download Apps", keys: ["Ctrl", "Shift", "D"] },
  { label: "Close Tab", keys: ["Ctrl", "W"] },
  { label: "Open Form", keys: ["Ctrl", "F"] },
  { label: "Upgrade Plan", keys: ["Ctrl", "Alt", "U"] },
  { label: "Delete Place", keys: ["Ctrl", "D"] },
  { label: "Places", keys: ["Ctrl", "Shift", "P"] },
  { label: "Close Form", keys: ["Esc", "."] },
  { label: "Personalization", keys: ["Ctrl", "Alt", "P"] },
  { label: "Logout", keys: ["Ctrl", "Alt", "L"] },
];

// Component 🧩
function KeyboardShortcuts() {
  return (
    <div className={styles.keyboardShortCuts}>
      {/* <Logo /> */}

      <div className={styles.logo}>
        <img src={pingo} alt="pingo logo" />
      </div>

      <div className={styles.shortcut}>
        {shortcuts.map((shortcut, i) => (
          <Shortcut shortcut={shortcut} key={i} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

// Component 🧩
function Shortcut({ shortcut }) {
  return (
    <div className={styles.shortcuts}>
      <div className={styles.keys}>
        <p>{shortcut.label}</p>
        <p>
          {shortcut.keys.length >= 3 ? (
            <>
              {" "}
              <span>{shortcut.keys[0]}</span> {"+"}
              <span>{shortcut.keys[1]}</span>
              {"+"} <span>{shortcut.keys[2]}</span>
            </>
          ) : (
            <>
              <span>{shortcut.keys[0]}</span> {"+"}
              <span>{shortcut.keys[1]}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default KeyboardShortcuts;

/*



      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Open Sidebar</p>
          <p>
            <span>Ctrl</span>+ <span>B</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Close Sidebar</p>
          <p>
            <span>Ctrl</span>+ <span>B</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Help Center</p>
          <p>
            <span>Ctrl</span>+<span>Shift</span>+<span>H</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Terms & Policies</p>
          <p>
            <span>Ctrl</span>+ <span>T</span>+<span>P</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Report A Bug</p>
          <p>
            <span>Ctrl</span>+ <span>Shift</span>+<span>B</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Settings</p>
          <p>
            <span>Ctrl</span>+ <span>S</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Countries</p>
          <p>
            <span>Ctrl</span>+ <span>Shift</span>+<span>C</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Download Apps</p>
          <p>
            <span>Ctrl</span>+ <span>Shift</span>+<span>B</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Close Tab</p>
          <p>
            <span>Ctrl</span>+ <span>W</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Keyboard Shortcuts</p>
          <p>
            <span>Ctrl</span>+ <span>P</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Open Form</p>
          <p>
            <span>Ctrl</span>+ <span>F</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Upgrade Plan</p>
          <p>
            <span>Ctrl</span>+ <span>Alt</span>+<span>U</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Delete Place</p>
          <p>
            <span>Ctrl</span>+ <span>D</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Places</p>
          <p>
            <span>Ctrl</span>+ <span>Shift</span>+<span>P</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Upgrade Plan</p>
          <p>
            <span>Ctrl</span>+ <span>Alt</span>+<span>U</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Personalization</p>
          <p>
            <span>Ctrl</span>+ <span>Alt</span>+<span>P</span>
          </p>
        </div>
      </div>

      <div className={styles.shortcuts}>
        <div className={styles.keys}>
          <p>Logout</p>
          <p>
            <span>Ctrl</span>+ <span>Alt</span>+<span>L</span>
          </p>
        </div>
      </div>


*/
