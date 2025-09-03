import NavBar from "@/components/NavBar/NavBar";

import styles from "./page.module.scss";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  return (
    <div className={styles.page}>
      <NavBar />
      <main>
        <div className={styles.gridContainer}></div>
      </main>
      <Footer />
    </div>
  );
}
