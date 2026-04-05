import styles from "./Footer.module.css";

function Footer({ color = "#aaa", bgColor = "#242a2e" }) {
  return (
    <footer className={styles.footer} style={{ backgroundColor: bgColor }}>
      <p style={{ color: color }}>
        © {new Date().getFullYear()} Pingo. Track your travels, pin your
        memories. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
