import { spotlights } from "@/data/spotlights";
import FeaturedSpotlight from "@/components/FeaturedSpotlight";
import SpotlightCard from "@/components/SpotlightCard";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  const featured = spotlights.find((s) => s.featured) ?? spotlights[0];
  const rest = spotlights.filter((s) => s.id !== featured.id);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>Women in STEM Spotlight</div>
        <h1 className={styles.heroTitle}>
          Illuminating the Women<br />
          <span className={styles.heroAccent}>Who Changed Everything</span>
        </h1>
        <p className={styles.heroSub}>
          Discover the groundbreaking scientists, mathematicians, engineers, and
          technologists whose contributions continue to shape our world.
        </p>
        <div className={styles.heroActions}>
          <a href="#spotlights" className={styles.heroCtaPrimary}>
            Explore Spotlights
          </a>
          <Link href="/nominate" className={styles.heroCtaSecondary}>
            Nominate Someone ↗
          </Link>
        </div>
      </section>

      {/* Featured Spotlight */}
      <div id="spotlights">
        <FeaturedSpotlight spotlight={featured} />
      </div>

      {/* Divider */}
      <div className={styles.divider}>
        <span>All Spotlights</span>
      </div>

      {/* Grid */}
      <section className={styles.grid}>
        {rest.map((spotlight) => (
          <SpotlightCard key={spotlight.id} spotlight={spotlight} />
        ))}
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <h2 className={styles.ctaTitle}>Know a Trailblazer?</h2>
        <p className={styles.ctaSub}>
          Help us shine a light on more remarkable women in STEM. Submit a
          nomination and we'll feature them in our next spotlight.
        </p>
        <Link href="/nominate" className={styles.ctaBtn}>
          Submit a Nomination
        </Link>
      </section>
    </>
  );
}
