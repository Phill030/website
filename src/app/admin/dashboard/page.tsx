import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import styles from "./page.module.scss";
import RolePill from "@/components/RolePill/RolePill";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import ApiKeyList from "@/components/ApiKeyList/ApiKeysList";
import UserList from "@/components/UserList/UserList";
import { Roles } from "./util";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.discordProfile) {
    redirect("/admin/auth");
  }

  return (
    <div className={styles.page}>
      <main>
        <PanelElement style={{ alignItems: "center", textAlign: "center", gridColumn: "span 1" }} className={styles.userPanel}>
          {/*eslint-disable-next-line*/}
          <img src={session.user.image!} alt="User Avatar" style={{ borderRadius: "50%", pointerEvents: "none", userSelect: "none" }} />
          <h1>{session.discordProfile?.global_name}</h1>
          <RolePill role="Admin" svg={Object.values(Roles)[2].svg} color="#e2c625" />
          <SignOutButton />
        </PanelElement>
        <PanelElement style={{ gridColumn: "span 3" }} className={styles.managePanel}>
          <UserList profile={session.discordProfile} />
        </PanelElement>
        <PanelElement style={{ gridColumn: "span 4" }} className={styles.managePanel}>
          <ApiKeyList profile={session.discordProfile} />
        </PanelElement>
      </main>
    </div>
  );
}

function PanelElement({ style, className, children }: { style?: React.CSSProperties; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`${styles.panel} ${className}`} style={style}>
      {children}
    </div>
  );
}
