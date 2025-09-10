"use client";

import NavBar from "@/components/NavBar/NavBar";
import styles from "./page.module.scss";
import Footer from "@/components/Footer/Footer";
import { CSSProperties, useState } from "react";

type Status = "Completed" | "In Progress" | "Planned";

type Project = {
  title: string;
  description: string;
  authors?: Array<string>;
  icon?: React.ReactNode;
  date: string;
  color: CSSProperties["color"];
  stack?: Array<string>;
  status?: Status;
  link: string;
};

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

const githubIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </g>
  </svg>
);

export default function Page() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Aurorium",
      description:
        "A Rust-based backend server that powers the Revive101 project by automating the fetching, management, and distribution of Wizard101 client files to restore and maintain the gam's patch infrastructure.",
      date: "10.2023",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M19 22.5a4.75 4.75 0 0 1 3.5-3.5a4.75 4.75 0 0 1-3.5-3.5a4.75 4.75 0 0 1-3.5 3.5a4.75 4.75 0 0 1 3.5 3.5M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
            <path d="M12 20H6a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h10.5M7 8v.01M7 16v.01" />
          </g>
        </svg>
      ),
      color: "#6366f1",
      stack: ["Rust", "Axum"],
      status: "In Progress",
      link: "/projects/aurorium",
    },
    {
      title: "KiWad-Unpacker",
      description:
        "KiWad-Unpacker is a high-performance tool, that rapidly extracts Wizard101 .wad archives via drag-and-drop or command-line with minimal setup and expertise required.",
      date: "10.2023",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m12 3l8 4.5v9L12 21l-8-4.5v-9zm0 9l8-4.5M12 12v9m0-9L4 7.5"
          />
        </svg>
      ),
      color: "#d946ef",
      stack: ["Rust", "Rayon"],
      status: "Completed",
      link: "https://github.com/phill030/KiWad-Unpacker",
    },
    {
      title: "XOR NeuralNetwork",
      description:
        "This Rust project implements a configurable neural network from scratch with input, dense, and output layers, sigmoid activation, backpropagation training, and training loss visualization.",
      date: "10.2023",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5">
            <path d="M21.25 5.5a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5Zm0 0v3.75c0 .698 0 1.047-.086 1.33a2 2 0 0 1-1.333 1.334C19.547 12 19.198 12 18.5 12M2.75 18.5a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5Zm0 0v-3.75c0-.698 0-1.047.086-1.33a2 2 0 0 1 1.333-1.334C4.453 12 4.802 12 5.5 12m0-9.25a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0Zm0 0h3.75c.698 0 1.047 0 1.33.086a2 2 0 0 1 1.334 1.334C12 4.453 12 4.802 12 5.5m6.5 15.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0Zm0 0h-3.75c-.698 0-1.047 0-1.33-.086a2 2 0 0 1-1.334-1.333C12 19.547 12 19.198 12 18.5" />
            <path d="M5.549 11.951c0-3.064 0-4.596.952-5.548s2.484-.952 5.548-.952s4.596 0 5.548.952s.952 2.484.952 5.548s0 4.596-.952 5.548s-2.484.952-5.548.952s-4.596 0-5.548-.952s-.952-2.484-.952-5.548Z" />
            <path
              strokeLinecap="round"
              d="m12.499 14.5l-1.46-4.521a.72.72 0 0 0-.694-.479a.72.72 0 0 0-.693.479L8.192 14.5m6.807-5v5M8.729 13h3.232"
            />
          </g>
        </svg>
      ),
      color: "#10b981",
      stack: ["Rust", "Plotters", "Something", "else"],
      status: "Completed",
      link: "https://github.com/phill030/KiWad-Unpacker",
    },
    {
      title: "This Website",
      description: "The very website you're on right now! Built with Next.js, TypeScript, and SCSS for a sleek, modern look.",
      date: "04.2024",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 21.474A9.474 9.474 0 0 0 21.474 12a9.474 9.474 0 1 0-18.948 0A9.474 9.474 0 0 0 12 21.474m3.796-16.578q.196.283.37.586c.514.893.92 1.95 1.189 3.116q.554.145 1.045.318c.45.16.87.34 1.243.542a8.08 8.08 0 0 0-3.847-4.562m4.013 9.08c-.414.24-.89.451-1.41.634q-.443.157-.938.29c-.263 1.365-.708 2.599-1.295 3.618a8 8 0 0 1-.37.586a8.07 8.07 0 0 0 4.013-5.129M8.204 19.103a8 8 0 0 1-.37-.586c-.587-1.02-1.032-2.253-1.295-3.618q-.495-.133-.939-.29a8.4 8.4 0 0 1-1.408-.635a8.07 8.07 0 0 0 4.012 5.129M4.357 9.458A9 9 0 0 1 5.6 8.916q.492-.173 1.046-.318c.269-1.166.674-2.223 1.188-3.116q.175-.303.37-.586a8.08 8.08 0 0 0-3.847 4.562m10.578-3.266c.345.599.64 1.3.867 2.08c-.958-.159-2-.258-3.091-.289V4.11c.792.259 1.572.95 2.224 2.082m1.202 3.584a21 21 0 0 0-3.426-.37v4.715a21 21 0 0 0 3.495-.385q.104-.838.105-1.736c0-.774-.061-1.52-.174-2.224M11.29 4.11v3.873c-1.091.03-2.133.13-3.091.288c.227-.779.521-1.48.866-2.08c.652-1.131 1.433-1.822 2.225-2.08m0 5.295a21 21 0 0 0-3.427.371a14.3 14.3 0 0 0-.069 3.96c1.034.21 2.22.348 3.496.385zm-5.216.851q.147-.053.302-.102a15.7 15.7 0 0 0-.05 3.202q-.129-.042-.252-.086c-.745-.263-1.297-.56-1.65-.854c-.356-.297-.43-.521-.43-.653c0-.131.074-.355.43-.653c.353-.294.905-.591 1.65-.854m2.991 7.552c-.417-.723-.76-1.596-.999-2.575c.994.17 2.082.278 3.223.31v4.347c-.791-.259-1.572-.95-2.224-2.082m3.646 2.082v-4.347a23 23 0 0 0 3.223-.31c-.24.979-.582 1.852-1 2.575c-.651 1.132-1.431 1.823-2.223 2.082M17.73 12q0 .69-.057 1.356q.129-.042.252-.086c.745-.263 1.297-.56 1.65-.854c.356-.297.43-.521.43-.653c0-.131-.074-.355-.43-.653c-.353-.294-.905-.591-1.65-.854a10 10 0 0 0-.302-.102q.107.9.108 1.846"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "#3b82f6",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Next-Auth", "SCSS"],
      status: "In Progress",
      link: "https://github.com/phill030/website",
    },
    {
      title: "Revive101",
      description:
        "Revive101 is a community-driven open-source initiative that revives Wizard101 by reverse-engineering its server infrastructure and automating client file distribution. Join us in bringing back the magic!",
      date: "02.2021",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none">
            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
            <path
              fill="currentColor"
              d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
            />
          </g>
        </svg>
      ),
      color: "#f59e0b",
      stack: ["C# & .NET", "Rust", "Python", "RavenDB"],
      status: "In Progress",
      authors: ["Phill030", "PhazeJeff", "Jooty", "Gmrush", "MoMisGrand", "R-unic", "glomdom", "Rocketprogrammer"],
      link: "https://github.com/revive101",
    },
  ];

  return (
    <div className={styles.page}>
      <NavBar />

      <main>
        <div className={styles.fullscreenHero}>
          <h1 className={styles.pageTitle}>My Projects</h1>
          <p className={styles.pageDescription}>A collection of my work, experiments, and creative endeavors.</p>
          <div className={styles.projectsContainer}>
            {projects.map((project, idx) => {
              return (
                <ProjectCard
                  key={idx}
                  project={project}
                  onClick={() => {
                    //  setSelectedProject(project)
                    window.open(project.link, "_blank", "noopener,noreferrer");
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div className={styles.card} onClick={onClick} style={{ "--shadow-color": `${project.color}33` } as React.CSSProperties}>
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
