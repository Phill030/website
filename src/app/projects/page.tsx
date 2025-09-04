import styles from "./page.module.scss";

// interface Project {
//   title: string;
//   description: string;
//   tech: Array<string>;
//   status: Status;
//   date: string;
//   type: string;
//   link?: string;
// }

// enum Status {
//   Completed = "Completed",
//   InProgress = "In Progress",
//   Planned = "Planned",
// }

export default function Page() {
  return <div className={styles.page}></div>;
}
