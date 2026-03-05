import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          Women in STEM
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Spotlights
          </Link>
          <Link href="/nominate" className={styles.nominate}>
            Nominate Someone
          </Link>
        </nav>
      </div>
    </header>
  );
}
