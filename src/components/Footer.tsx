import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>✦</span>
          <p>Women in STEM Spotlight</p>
          <p className={styles.sub}>Celebrating the women shaping our world.</p>
        </div>
        <div className={styles.links}>
          <Link href="/">Spotlights</Link>
          <Link href="/nominate">Nominate</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        © {new Date().getFullYear()} Women in STEM Spotlight. All rights reserved.
      </div>
    </footer>
  );
}
