import Image from "next/image";
import styles from "./page.module.scss";
import FoxSniff from "~/public/fox-sniff.gif";
import { Metadata } from "next";

const MailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect width="20" height="16" x="2" y="4" rx="2" />
    </g>
  </svg>
);

const GitHubIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </g>
  </svg>
);

const PinIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </g>
  </svg>
);

const CapIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.836 3.202L1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202M1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.9 1.9 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447"
      clipRule="evenodd"
    />
  </svg>
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About - Phill",
    keywords: ["About", "Phill", "Backend Developer", "Computer Science Student", "Rust", "Cryptography", "Secure Systems"],
    authors: [{ name: "Phill", url: "https://phill030.de" }],
    creator: "Phill",
    description:
      "I'm Phill, a Computer Science student and backend developer specializing in Rust. I enjoy building practical tools and exploring cryptography and secure systems.",
    openGraph: {
      title: "About - Phill",
      description:
        "Hi! I'm Phill, a backend developer and computer science student, mostly working with Rust. I enjoy exploring cryptography and secure systems, and I like tackling problems where performance and reliability really matter. A lot of my projects revolve around building practical tools.",
      type: "website",
    },
    twitter: {
      title: "About - Phill",
      description:
        "Hi! I'm Phill, a backend developer and computer science student, mostly working with Rust. I enjoy exploring cryptography and secure systems, and I like tackling problems where performance and reliability really matter. A lot of my projects revolve around building practical tools.",
      card: "summary_large_image",
    },
  };
}

export default function Page() {
  return (
    <div className={styles.page}>
      <section>
        <div className={styles.aboutSection}>
          <div className={styles.profile}>
            <Image alt="Profile Picture" src={FoxSniff} width={100} height={100} style={{ borderRadius: "50%" }} />
            <div className={styles.info}>
              <h1>Hi, I'm Phill</h1>
              <p>Backend Developer & Computer Science Student</p>
            </div>
          </div>
          <p className={styles.description}>
            I'm a Computer Science student who focuses on backend development, mostly working with Rust. I enjoy exploring cryptography and
            secure systems, and I like tackling problems where performance and reliability really matter. A lot of my projects revolve
            around building practical tools.
          </p>
          <div className={styles.buttons}>
            <a className={`${styles.button} ${styles.primary}`} href="mailto:contact@phill030.de">
              {MailIcon} Get In Touch
            </a>
            <a
              className={`${styles.button} ${styles.secondary}`}
              href="https://github.com/phill030"
              target="_blank"
              rel="noopener noreferrer"
            >
              {GitHubIcon} GitHub
            </a>
          </div>
          <div className={styles.traits}>
            <Trait icon={PinIcon} title="Germany" />
            <Trait icon={CapIcon} title="Computer Science Student" />
          </div>
        </div>

        <div className={styles.arrowDown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </section>
      <section className={styles.projectsSection}>
        <h2>Projects</h2>
        <div className={styles.projects}>{/* Project components would go here */}</div>
      </section>
    </div>
  );
}

function Trait({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className={styles.trait}>
      <div className={styles.icon}>{icon}</div>
      <span>{title}</span>
    </div>
  );
}
