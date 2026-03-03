import Image from "next/image";
import Link from "next/link";
import { Spotlight } from "@/data/spotlights";
import styles from "./FeaturedSpotlight.module.css";

interface Props {
  spotlight: Spotlight;
}

export default function FeaturedSpotlight({ spotlight }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.badge}>Featured Spotlight</div>
      <div className={styles.grid}>
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <Image
              src={spotlight.photo}
              alt={spotlight.name}
              fill
              className={styles.image}
              priority
              sizes="(max-width: 900px) 100vw, 500px"
            />
            <div className={styles.glow} />
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.field}>{spotlight.field}</span>
          <h2 className={styles.name}>{spotlight.name}</h2>
          <p className={styles.bio}>{spotlight.biography}</p>
          <blockquote className={styles.quote}>
            <span className={styles.quoteMarks}>&ldquo;</span>
            {spotlight.quote}
            <span className={styles.quoteMarks}>&rdquo;</span>
          </blockquote>
          <Link href={`/spotlight/${spotlight.id}`} className={styles.cta}>
            Read Full Story →
          </Link>
        </div>
      </div>
    </section>
  );
}
