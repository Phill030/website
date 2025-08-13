import styles from "./page.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.gradient} />
      <div className={styles.movingGradient} />
      <div className={styles.movingGradient2} />
      <div className={styles.movingGradient3} />
      <div className={styles.movingGradient4} />

      <main>
        <h1 className={styles.title}>Aurorium</h1>
        <p className={styles.description}>A fast, efficient open-source server powering the revival of Wizard101.</p>
        <div className={styles.container}>
          <button className={styles.primaryButton}>Get Started</button>
          <button className={styles.secondaryButton}>Learn More</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
