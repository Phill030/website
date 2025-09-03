"use client";

import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import Link from "next/link";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <h2 style={{ userSelect: "none" }}>
        <Link href="/">Phill030</Link>
      </h2>

      <div className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>

      <div className={`${styles.buttons} ${isMenuOpen ? styles.open : ""}`}>
        <Link href="/photography" className={styles.link}>
          Photography
        </Link>
        <Link href="/homelab" className={styles.link}>
          Homelab
        </Link>
        <Link href="/projects" className={styles.link}>
          Projects
        </Link>
        <Link href="/about" className={styles.link}>
          About me
        </Link>
      </div>
    </header>
  );
}
