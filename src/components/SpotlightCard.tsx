import Image from "next/image";
import Link from "next/link";
import { Spotlight } from "@/data/spotlights";
import styles from "./SpotlightCard.module.css";

interface Props {
  spotlight: Spotlight;
}

export default function SpotlightCard({ spotlight }: Props) {
  return (
    <Link href={`/spotlight/${spotlight.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={spotlight.photo}
          alt={spotlight.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.body}>
        <span className={styles.field}>{spotlight.field}</span>
        <h3 className={styles.name}>{spotlight.name}</h3>
        <p className={styles.bio}>{spotlight.biography.slice(0, 120)}…</p>
        <blockquote className={styles.quote}>
          &ldquo;{spotlight.quote}&rdquo;
        </blockquote>
      </div>
    </Link>
  );
}
