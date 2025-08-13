import styles from "./Footer.module.scss";

export default function Footer({ style }: { style?: React.CSSProperties }) {
  const thisYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} style={style}>
      <a href="/privacy">Copyright © Phill030 2022 - {thisYear}</a>
    </footer>
  );
}
