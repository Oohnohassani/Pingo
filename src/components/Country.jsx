import styles from "./Country.module.css";
import { shorten } from "../utils/helpers";

function Country({ country }) {
  const maxChars = 9;

  return (
    <div className={styles.country}>
      <span>{country.emoji}</span>
      <span>
        {country.country.length > maxChars
          ? shorten(country.country, maxChars)
          : country.country}
      </span>
    </div>
  );
}

export default Country;

// function shorten(name) {
//   if (name.length > 7) {
//     return name.split("").slice(0, 7).join("").concat("...");
//   }
// }

// console.log(shorten("Abdirahman"));
