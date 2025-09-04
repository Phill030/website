"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.scss";
import { Suspense } from "react";

enum Error {
  Unpermitted = "Unpermitted",
  Database = "Database",
  UnsupportedProvider = "UnsupportedProvider",
  InvalidData = "InvalidData",
}

const ErrorMap = {
  [Error.Unpermitted]: "You do not have permission to access this resource. Please wait for an administrator to grant you access.",
  [Error.Database]: "A database error occurred. Please try again later.",
  [Error.UnsupportedProvider]: "The authentication provider you are using is not supported.",
  [Error.InvalidData]: "The data provided is invalid.",
};

function ErrorContent() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className={styles.page}>
      <main>
        <h1 className={styles.error}>Error</h1>
        <p>{ErrorMap[error] ? ErrorMap[error] : `Unknown error (${error})`}</p>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className={styles.page}>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
