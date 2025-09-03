import styles from "./RolePill.module.scss";

export default function RolePill({ role, svg, color }: { role: string; svg: React.ReactNode; color: string }) {
  return (
    <div className={styles.pill} style={{ backgroundColor: `${color}22`, border: `1px solid ${color}`, color }}>
      {svg}
      <p>{role}</p>
    </div>
  );
}
