import styles from "./PricingCard.module.css";

function StandardPricingCard({ isYearly, fade }) {
  return (
    <div className={`${styles.cardWrapper} ${styles.standardCard}`}>
      <div className={styles.card}>
        <header>
          <h3>Standard</h3>
          <p>Ideal for growing businesses</p>
        </header>
        <div className={styles.cardContent}>
          <p className={`${styles.price} ${fade ? styles.fade : ""}`}>
            <small>$</small>
            {isYearly ? (30 * 12) / 1 : 29}
            <small>{isYearly ? "/annually" : "/monthly"}</small>
          </p>

          <button className={styles.planBtn}>Select plan</button>

          <div className={`${styles.planFeatures} ${styles.standardFeatures}`}>
            <ul>
              <li>
                <span>✔</span>15 Projects
              </li>
              <li>
                <span>✔</span> 50GB Storage
              </li>
              <li>
                <span>✔</span> Priority Support
              </li>
              <li>
                <span>✔</span> Team Collaboration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StandardPricingCard;
