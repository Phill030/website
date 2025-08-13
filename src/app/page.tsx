import styles from "./page.module.scss";
import backgroundImage from "~/public/photos/IMG_5278.jpg";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BackgroundImage from "@/components/BackgroundImage/BackgroundImage";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <BackgroundImage src={backgroundImage} alt="Background image" filter="brightness(75%)" />

      <main>
        <h1 className={styles.title}>
          Hello, I&apos;m{" "}
          <Link href="/about" className={styles.name}>
            Phill
          </Link>
        </h1>
        <p className={styles.description}>A passionate Backend-Developer</p>
      </main>

      <Footer />
    </div>
  );
}
