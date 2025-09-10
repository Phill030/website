"use client";

import { Project, Status } from "@/app/projects/page";
import styles from "./ProjectCard.module.scss";

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16M7 14h.013m2.997 0h.005m2.995 0h.005m3 0h.005m-3.005 3h.005m-6.01 0h.005m2.995 0h.005"
    />
  </svg>
);

const usersIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"
    />
  </svg>
);

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={styles.card}
      onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
      style={{ "--shadow-color": `${project.color}33` } as React.CSSProperties}
    >
      <div className={styles.cardHighlight} style={{ backgroundColor: project.color }} />
      <div className={styles.header}>
        <div className={styles.icon}>{project.icon}</div>
        <div className={styles.title}>
          <h2>{project.title}</h2>
          <div className={styles.meta}>
            <p>
              {calendarIcon} {project.date}
            </p>
            <p>
              {usersIcon} {project.authors ? `${project.authors.length} People` : "Phill030"}
            </p>
          </div>
        </div>
      </div>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.attributes}>
        <StatusBadge status={project.status || "Planned"} />
        <div className={styles.techList}>
          {project.stack?.slice(0, 3).map((tech) => (
            <span key={tech} className={styles.tech}>
              {tech}
            </span>
          ))}
          {project.stack && project.stack.length > 3 && <span className={styles.moreTech}>+{project.stack.length - 3} more</span>}
        </div>
      </div>
    </div>
  );
}

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  switch (status) {
    case "Completed":
      return <span className={`${styles.statusBadge} ${styles.completed}`}>Completed</span>;
    case "In Progress":
      return <span className={`${styles.statusBadge} ${styles.inProgress}`}>In Progress</span>;
    case "Planned":
      return <span className={`${styles.statusBadge} ${styles.planned}`}>Planned</span>;
  }
};
