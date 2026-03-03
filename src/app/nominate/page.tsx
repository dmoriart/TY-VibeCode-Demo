"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface FormState {
  nominatorName: string;
  nominatorEmail: string;
  nomineeName: string;
  field: string;
  biography: string;
  quote: string;
  photoUrl: string;
  reason: string;
}

const INITIAL_STATE: FormState = {
  nominatorName: "",
  nominatorEmail: "",
  nomineeName: "",
  field: "",
  biography: "",
  quote: "",
  photoUrl: "",
  reason: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function NominatePage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // Simulate async submission
    await new Promise((res) => setTimeout(res, 1200));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className={styles.successWrap}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✦</div>
          <h2 className={styles.successTitle}>Nomination Received!</h2>
          <p className={styles.successMsg}>
            Thank you for nominating <strong>{form.nomineeName}</strong>. Our
            team will review your submission and reach out if we need more
            information. We appreciate your help spotlighting incredible women
            in STEM.
          </p>
          <button
            className={styles.resetBtn}
            onClick={() => {
              setForm(INITIAL_STATE);
              setStatus("idle");
            }}
          >
            Submit Another Nomination
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <span className={styles.badge}>Nominations Open</span>
        <h1 className={styles.title}>
          Nominate a <span className={styles.accent}>STEM Trailblazer</span>
        </h1>
        <p className={styles.subtitle}>
          Know a remarkable woman in science, technology, engineering, or
          mathematics? Help us celebrate her story. Fill out the form below and
          our editorial team will review your nomination.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Section: Your Info */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>About You</legend>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="nominatorName" className={styles.label}>
                Your Name <span className={styles.req}>*</span>
              </label>
              <input
                id="nominatorName"
                name="nominatorName"
                type="text"
                required
                placeholder="Jane Smith"
                value={form.nominatorName}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="nominatorEmail" className={styles.label}>
                Your Email <span className={styles.req}>*</span>
              </label>
              <input
                id="nominatorEmail"
                name="nominatorEmail"
                type="email"
                required
                placeholder="jane@example.com"
                value={form.nominatorEmail}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
        </fieldset>

        {/* Section: Nominee Info */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>About the Nominee</legend>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="nomineeName" className={styles.label}>
                Full Name <span className={styles.req}>*</span>
              </label>
              <input
                id="nomineeName"
                name="nomineeName"
                type="text"
                required
                placeholder="Dr. Ada Lovelace"
                value={form.nomineeName}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="field" className={styles.label}>
                Field of STEM <span className={styles.req}>*</span>
              </label>
              <select
                id="field"
                name="field"
                required
                value={form.field}
                onChange={handleChange}
                className={`${styles.input} ${styles.select}`}
              >
                <option value="">Select a field…</option>
                <option>Mathematics</option>
                <option>Computer Science</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                <option>Engineering</option>
                <option>Aerospace & Space Science</option>
                <option>Environmental Science</option>
                <option>Neuroscience</option>
                <option>Medicine</option>
                <option>Data Science & AI</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="photoUrl" className={styles.label}>
              Photo URL
              <span className={styles.hint}> (optional public image link)</span>
            </label>
            <input
              id="photoUrl"
              name="photoUrl"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={form.photoUrl}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="biography" className={styles.label}>
              Biography <span className={styles.req}>*</span>
              <span className={styles.hint}> (100–500 words)</span>
            </label>
            <textarea
              id="biography"
              name="biography"
              required
              rows={6}
              placeholder="Describe her achievements, research, and impact on STEM…"
              value={form.biography}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="quote" className={styles.label}>
              Inspirational Quote
              <span className={styles.hint}> (a quote by or about her)</span>
            </label>
            <textarea
              id="quote"
              name="quote"
              rows={3}
              placeholder='"The most dangerous phrase in the language is: We\'ve always done it this way."'
              value={form.quote}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="reason" className={styles.label}>
              Why Should She Be Featured? <span className={styles.req}>*</span>
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              rows={4}
              placeholder="Tell us why this person deserves a spotlight and what makes her story important to share…"
              value={form.reason}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
            />
          </div>
        </fieldset>

        <div className={styles.formFooter}>
          <p className={styles.privacyNote}>
            By submitting, you agree that the information provided may be
            published on this site. We will never share your personal contact
            details.
          </p>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting…" : "Submit Nomination →"}
          </button>
        </div>
      </form>
    </div>
  );
}
