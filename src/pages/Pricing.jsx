import { useState } from "react";
import FAQ from "../components/FAQ";
import PricingCard from "../components/PricingCard";
import StandardPricingCard from "../components/StandardPricingCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./Pricing.module.css";

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [fade, setFade] = useState(false);

  // function handleToggle() {
  //   setIsYearly((prev) => !prev);
  //   console.log("...workks");
  // }

  // Note to fade in and out the price.

  function handleToggle() {
    setFade(true);

    setTimeout(() => {
      setIsYearly((prev) => !prev);
      setFade(false);
    }, 200);
  }

  return (
    <>
      <Navbar />
      <section className={styles.pricing}>
        <h6>Pricing</h6>
        <div className={styles.pricingHeader}>
          <h2>
            Plans that <i className={styles.italic}>grow</i> with you.
          </h2>
          <p>Unlock potential with plans designed to fule growth. </p>
        </div>

        <div className={styles.pricingToggle}>
          <p>Monthly</p>
          <span
            className={`${styles.toggle} ${isYearly ? styles.active : ""}`}
            onClick={handleToggle}
          >
            <span></span>
          </span>
          <p>Yearly</p>
          <span className={styles.discount}>Save 20%</span>
        </div>

        <div className={styles.pricingCards}>
          <PricingCard
            title="Basic"
            description="Perfect for growing teams"
            price={isYearly ? "115" : "12"}
            features={[
              "5 Projects",
              "10GB Storage",
              "Email Support",
              "Free cloud support",
            ]}
            fade={fade}
            isYearly={isYearly}
          />

          {/* Standard card is different because we will use it's data separately later! */}
          <StandardPricingCard isYearly={isYearly} fade={fade} />

          <PricingCard
            title="Premium"
            description="Perfect for growing teams"
            price={isYearly ? "470" : "49"}
            features={[
              "Unlimited Projects",
              "500GB Storage",
              "Priority Support",
              "Team Collaboration",
            ]}
            fade={fade}
            isYearly={isYearly}
          />
        </div>

        <div className={styles.faq}>
          <FAQ />
        </div>
      </section>
      <Footer color="#f0f8ff9a" />
    </>
  );
}

export default Pricing;
