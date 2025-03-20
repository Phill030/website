import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <div className={styles.gridContainer}></div>
      </main>
      <Footer />
    </div>
  );
}
