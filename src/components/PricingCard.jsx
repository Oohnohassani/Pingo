import styles from "./PricingCard.module.css";

function PricingCard({
  title = "Basic",
  description = "Ideal for small businesses",
  price = "29",
  features = [
    "5 Projects",
    "10GB Storage",
    "Email Support",
    "Team Collaboration",
  ],
  className = "",
  buttonClass = "",
  isYearly,
  fade,
}) {
  return (
    <div className={`${styles.cardWrapper} ${className} `}>
      <div className={styles.card}>
        <header>
          <h3>{title}</h3>
          <p>{description}</p>
        </header>

        <div className={styles.cardContent}>
          <p className={`${styles.price} ${fade ? styles.fade : ""}`}>
            <small>$</small>
            {price}
            <small>{isYearly ? "/annually" : "/monthly"}</small>
          </p>

          <button className={`${styles.planBtn} ${buttonClass}`}>
            Select plan
          </button>

          <div className={styles.planFeatures}>
            <ul>
              {features.map((feature, index) => (
                <li key={index}>
                  <span>✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
