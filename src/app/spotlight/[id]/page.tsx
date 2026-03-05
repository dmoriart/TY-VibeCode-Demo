import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { spotlights } from "@/data/spotlights";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return spotlights.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const s = spotlights.find((s) => s.id === id);
  if (!s) return {};
  return { title: `${s.name} — Women in STEM Spotlight` };
}

export default async function SpotlightPage({ params }: Props) {
  const { id } = await params;
  const spotlight = spotlights.find((s) => s.id === id);
  if (!spotlight) notFound();

  const others = spotlights.filter((s) => s.id !== spotlight.id).slice(0, 3);

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Back to Spotlights
      </Link>

      <article className={styles.article}>
        <div className={styles.hero}>
          <div className={styles.imageWrap}>
            <Image
              src={spotlight.photo}
              alt={spotlight.name}
              fill
              className={styles.image}
              priority
              sizes="(max-width: 600px) 100vw, 420px"
            />
          </div>
          <div className={styles.heroContent}>
            <span className={styles.field}>{spotlight.field}</span>
            <h1 className={styles.name}>{spotlight.name}</h1>
            <blockquote className={styles.quote}>
              <span className={styles.quoteMarks}>&ldquo;</span>
              {spotlight.quote}
              <span className={styles.quoteMarks}>&rdquo;</span>
            </blockquote>
          </div>
        </div>

        <div className={styles.bio}>
          <h2 className={styles.bioHeading}>Biography</h2>
          <p className={styles.bioText}>{spotlight.biography}</p>
        </div>
      </article>

      {others.length > 0 && (
        <section className={styles.more}>
          <h3 className={styles.moreHeading}>More Spotlights</h3>
          <div className={styles.moreGrid}>
            {others.map((s) => (
              <Link key={s.id} href={`/spotlight/${s.id}`} className={styles.moreCard}>
                <div className={styles.moreImageWrap}>
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    className={styles.moreImage}
                    sizes="200px"
                  />
                </div>
                <div className={styles.moreInfo}>
                  <span className={styles.moreField}>{s.field}</span>
                  <span className={styles.moreName}>{s.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
