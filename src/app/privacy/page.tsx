import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.gradient} />
      <main>
        <div className={styles.gridContainer}>
          <div className={styles.preface}>
            <h1 style={{ textAlign: "center" }}>Privacy Policy for phill030.de</h1>
            <p>
              This Privacy Policy explains how `phill030.de` ("we," "our," or "us") collects, uses, and protects your personal data when you
              visit our website. By using this website, you agree to the terms outlined in this policy.
            </p>
          </div>
          <h2>Information We Collect</h2>
          <p>
            We collect the following information automatically when you visit our website: - <strong>User-Agent Information:</strong> This
            includes data about your browser, operating system, and device type, which is logged by our web server (NGINX) for technical and
            security purposes. We do not collect any personally identifiable information (e.g., names, email addresses, or IP addresses)
            unless you voluntarily provide it (e.g., via email).
          </p>
          <h2>How We Use Your Information</h2>
          <p>The information we collect is used for the following purposes:</p>
          <ul>
            <li>To ensure the proper functioning and security of our website.</li>
            <li>To analyze website traffic and improve user experience (anonymous data only).</li>
          </ul>
          <h2>Data Storage and Security</h2>
          <p>
            We take the security of your data seriously. All data collected is stored on servers secured with <strong>encryption</strong>{" "}
            and protected by <strong>SSH-keys</strong>. We implement technical and organizational measures to safeguard your information
            against unauthorized access, loss, or misuse.
          </p>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We do <strong>not</strong> use cookies or any tracking technologies on our website.
          </p>
          <h2>Third-Party Sharing</h2>
          <p>
            We do <strong>not</strong> sell, trade, or rent your personal data. However, we may share information with:
          </p>
          <ul>
            <li>
              <strong>Legal Compliance</strong>: If required by law, we may disclose information to comply with legal obligations.
            </li>
          </ul>
          <h2>Your Rights Under GDPR</h2>
          <p>
            As a user located in the European Union, you have the following rights under the{" "}
            <strong>General Data Protection Regulation (GDPR)</strong>:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> You can request a copy of the data we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request that we correct or update your data.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your data.
            </li>
            <li>
              <strong>Objection:</strong> You can object to the processing of your data.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:contact@phill030.de">
              <strong>contact@phill030.de</strong>
            </a>
            .
          </p>
          <h2>Contact Information</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:{" "}
            <a href="mailto:contact@phill030.de">contact@phill030.de</a>
          </p>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated "Last Updated"
            date. We encourage you to review this policy periodically.
          </p>
          <p style={{ marginTop: "10px" }}>
            <strong>Last Updated:</strong> 19.03.2025 20:31
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
