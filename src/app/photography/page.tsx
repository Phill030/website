import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import BackgroundImage from "@/components/BackgroundImage/BackgroundImage";
import bgImage from "~/public/photos/IMG_5280.jpg";
import Footer from "@/components/Footer/Footer";
import DisplayImage from "@/components/DisplayImage/DisplayImage";

// Images
import img1 from "~/public/photos/IMG_5264.jpg";
import img2 from "~/public/photos/IMG_5270.jpg";
import img3 from "~/public/photos/IMG_5274.jpg";
import img4 from "~/public/photos/IMG_5278.jpg";
import img5 from "~/public/photos/IMG_5279.jpg";
import img6 from "~/public/photos/IMG_5280.jpg";
import img7 from "~/public/photos/IMG_5284.jpg";
import img8 from "~/public/photos/IMG_5294.jpg";
import img9 from "~/public/photos/IMG_5327.jpg";
import img10 from "~/public/photos/IMG_5365.jpg";
import img11 from "~/public/photos/IMG_5369.jpg";
import img12 from "~/public/photos/IMG_5376.jpg";

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <BackgroundImage src={bgImage} alt="Background image" filter="brightness(40%)" />

      <main>
        <div className={styles.gridContainer}>
          <h1>Photography</h1>
          <div className={styles.item}>
            <DisplayImage src={img1} alt="Landgrafenschloss" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img2} alt="Marburg" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img3} alt="Parkdeck" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img4} alt="Regionalexpress 146 251" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img5} alt="Hbf. Marburg" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img6} alt="RE98 nach Gießen" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img7} alt="Ludwig-Schuler-Brücke" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img8} alt="Mini" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img9} alt="Rathaus" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img10} alt="Hbf. Marburg Gleis 5" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img11} alt="Hbf. Parkdeck" />
          </div>
          <div className={styles.item}>
            <DisplayImage src={img12} alt="RE97 Marburg (Lahn)" />
          </div>

          {/* <div className={`${styles.item} ${styles.doubleSize}`}>
            <h2>Camera</h2>
            <p>I'm using a Canon EOS 550D blablabla blebleble blobloblo blublublu hu blublublublublu blub blu blu blu blu blu blublublu blu</p>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
