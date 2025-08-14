"use client";

import styles from "./page.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactNode, useRef } from "react";

export default function Page() {
  const moreInfo = useRef<HTMLDivElement | null>(null);

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.gradient} />

      {typeof window !== "undefined" && window.innerWidth > 768 && (
        <>
          <div className={styles.movingGradient1} />
          <div className={styles.movingGradient2} />
          <div className={styles.movingGradient3} />
          <div className={styles.movingGradient4} />
        </>
      )}

      <main>
        <div className={styles.fullscreenHero}>
          <h1 className={styles.title}>Aurorium</h1>
          <p className={styles.description}>A fast, efficient open-source server powering the revival of Wizard101.</p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton} onClick={() => openLink("https://github.com/revive101/aurorium")}>
              Get Started
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() =>
                moreInfo.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Learn More
            </button>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <ContentSection
            ref={moreInfo}
            title="Introduction"
            icon={
              <svg viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2 6s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1zm10 0s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1z"
                />
              </svg>
            }
            description={
              <p>
                Aurorium is the backbone of the Revive101 project, providing essential file management for the Wizard101 client revival.
                Built with Rust for maximum performance and reliability, Aurorium handles client file synchronization, patch management, and
                ensures seamless connectivity between players and game servers. Our goal is to create an open, collaborative environment
                where the community can contribute to bringing back the magic of Wizard101.
              </p>
            }
          />

          <ContentSection
            title="Getting Started"
            icon={
              <svg viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.684 3.603c.521-.659.03-1.603-.836-1.603h-6.716a1.06 1.06 0 0 0-.909.502l-5.082 8.456c-.401.666.103 1.497.908 1.497h3.429l-3.23 8.065c-.467 1.02.795 1.953 1.643 1.215L20 9.331h-6.849z"
                />
              </svg>
            }
            description={
              <p>
                Download the latest version from{" "}
                <a href="https://github.com/revive101/aurorium/releases" rel="noopener noreferrer" target="_blank">
                  GitHub releases
                </a>{" "}
                or build it yourself. You need Rust installed to build from source. Clone the repo, run &apos;cargo build --release&apos; to
                compile, or &apos;cargo run&apos; for development. The app automatically gets the latest game files from version 2.0
                onwards.
              </p>
            }
          />

          <ContentSection
            title="Parameters"
            icon={
              <svg viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M169.357 335.059h-20.323v-45.177h33.159l19.254-67.764h-31.02v-45.177h43.856l9.627-33.882h42.787l-9.627 33.882h42.786l9.627-33.882h42.787l-9.627 33.882h20.323v45.177h-33.159l-19.254 67.764h31.02v45.177h-43.856l-9.627 33.882h-42.787l9.627-33.882h-42.786l-9.627 33.882H159.73zm74.877-112.941l-19.254 67.764h42.786l19.254-67.764zm-127.29-112.942v95.571c0 19.923-8.279 38.536-22.185 51.253c13.906 12.717 22.185 31.33 22.185 51.253v95.571h53.483V448h-53.483c-23.64 0-42.787-20.216-42.787-45.176v-95.571c0-8.335-4.342-15.97-11.295-19.923L42.667 275.9v-39.8l20.195-11.452c6.953-3.931 11.295-11.566 11.295-19.901v-95.571C74.158 84.216 93.306 64 116.945 64h41.588v45.176zm278.112 293.648v-95.571c0-19.923 8.279-38.536 22.185-51.253c-13.906-12.717-22.185-31.33-22.185-51.253v-95.571h-53.483V64h53.483c23.64 0 42.786 20.216 42.786 45.176v95.571c0 8.335 4.343 15.97 11.296 19.923l20.195 11.43v39.8l-20.195 11.452c-6.953 3.931-11.296 11.566-11.296 19.901v95.571c0 24.96-19.146 45.176-42.786 45.176h-41.588v-45.176z"
                  clipRule="evenodd"
                />
              </svg>
            }
            description={
              <p>
                You can customize how Aurorium works with these settings: where it connects (default: 127.0.0.1:12369), how many files to
                download at once (default: 2), where to save files (default: data folder), which patch server to use, and how long to wait
                for responses. Change these using command line flags or environment variables.
              </p>
            }
          />

          <ContentSection
            title="Contributing"
            icon={
              <svg viewBox="0 0 1024 1536">
                <path
                  fill="currentColor"
                  d="M288 1344q0-40-28-68t-68-28t-68 28t-28 68t28 68t68 28t68-28t28-68m0-1152q0-40-28-68t-68-28t-68 28t-28 68t28 68t68 28t68-28t28-68m640 128q0-40-28-68t-68-28t-68 28t-28 68t28 68t68 28t68-28t28-68m96 0q0 52-26 96.5T928 486q-2 287-226 414q-67 38-203 81q-128 40-169.5 71T288 1152v26q44 25 70 69.5t26 96.5q0 80-56 136t-136 56t-136-56t-56-136q0-52 26-96.5t70-69.5V358q-44-25-70-69.5T0 192q0-80 56-136T192 0t136 56t56 136q0 52-26 96.5T288 358v497q54-26 154-57q55-17 87.5-29.5t70.5-31t59-39.5t40.5-51t28-69.5T736 486q-44-25-70-69.5T640 320q0-80 56-136t136-56t136 56t56 136"
                />
              </svg>
            }
            description={
              <p>
                We welcome all contributions! Whether you&apos;re a Rust wizard or a curious apprentice, your input helps us grow. Read our
                Contributing Guidelines, fork the repo, make your changes, and submit a pull request. Report bugs or suggest features via
                GitHub issues. Contributors can request the @Contributor role in our Discord server - just make sure your GitHub account is
                linked to your Discord profile.
              </p>
            }
          />

          <ContentSection
            title="Community"
            icon={
              <svg viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.719 19.752l-.64-5.124A3 3 0 0 0 13.101 12h-2.204a3 3 0 0 0-2.976 2.628l-.641 5.124A2 2 0 0 0 9.266 22h5.468a2 2 0 0 0 1.985-2.248"
                  />
                  <circle cx="12" cy="5" r="3" />
                  <circle cx="4" cy="9" r="2" />
                  <circle cx="20" cy="9" r="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 14h-.306a2 2 0 0 0-1.973 1.671l-.333 2A2 2 0 0 0 3.361 20H7m13-6h.306a2 2 0 0 1 1.973 1.671l.333 2A2 2 0 0 1 20.639 20H17"
                  />
                </g>
              </svg>
            }
            description={
              <p>
                Join us on{" "}
                <a href="https://discord.gg/sMFgyNRDDM" rel="noopener noreferrer" target="_blank">
                  Discord
                </a>{" "}
                to meet other fans, developers, and contributors working on the Revive101 project! Our community is passionate about
                preserving the magic of Wizard101 and creating new opportunities for players to experience the Spiral. Connect with fellow
                wizards, share your experiences, participate in development discussions, and be part of the revival effort that&apos;s
                bringing this beloved game back to life.
              </p>
            }
          />
        </div>

        <Footer />
      </main>
    </div>
  );
}

function ContentSection({
  icon,
  title,
  description,
  ref,
}: {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}) {
  const props = ref ? { ref } : {};

  return (
    <div className={styles.content} {...props}>
      <div className={styles.header}>
        <div className={styles.iconHolder}>{icon}</div>
        <h2>{title}</h2>
      </div>
      {description}
    </div>
  );
}
