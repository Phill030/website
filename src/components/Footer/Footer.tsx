import styles from "./Footer.module.scss";

export default function Footer() {
  const thisYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>Copyright © Phill030 2022 - {thisYear}</p>
    </footer>
  );
}
