import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./Product.module.css";
import productImg from ".././assets/pingo app 1.png";

function Product() {
  return (
    <>
      <Navbar />
      <section className={styles.product}>
        <div className={styles.about}>
          <h6>Product</h6>
          <h2>
            About <i className={`${styles.italic} ${styles.pingo}`}>Pingo!</i>
          </h2>

          <div className={styles.aboutContent}>
            <p>
              Pingo is your personal travel companion for capturing memories
              from every place you visit. The idea behind the name comes from
              <i className={styles.italic}>“Pin and Go”</i> — simply pin the
              places you go to as you explore the world.Pingo lets you drop
              markers on a map wherever you’ve been and attach notes, photos, or
              thoughts to each location.
            </p>
            <p>
              Whether it’s a hidden café you discovered, a breathtaking
              viewpoint, or a meaningful moment during a trip, your memories
              stay connected to the exact place they happened.{" "}
              <b>Pingo turns your map into a personal travel diary.</b>
            </p>
          </div>
        </div>

        <div className={styles.productImage}>
          {/* BG image */}
          <div className={styles.bgImageWrapper}>
            <img
              className={styles.productImg}
              src={productImg}
              alt="about background image"
              draggable="false"
            />
          </div>
        </div>
      </section>

      <Footer bgColor="#2d3439" />
    </>
  );
}

export default Product;
