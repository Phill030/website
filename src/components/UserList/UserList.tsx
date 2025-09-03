"use client";

import { useEffect, useState } from "react";
import styles from "./UserList.module.scss";
import { DiscordAvatar } from "@/lib/util";
import { Profile } from "@/lib/auth";
import RolePill from "../RolePill/RolePill";
import { Roles } from "@/app/admin/dashboard/page";

const usersIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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

interface User {
  id: string;
  name: string;
  avatar: string;
  role: number;
  joined: Date;
  setRole: ((role: number) => Promise<void>) | null;
}

export default function UserList({ profile }: { profile: Profile | undefined }) {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRoleChange = async (toChangeId: string, role: number) => {
    if (toChangeId === profile?.id) {
      throw new Error("You cannot update your own role");
    }

    const res = await fetch(`/api/users/${toChangeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user role");
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === toChangeId) {
          return { ...u, role };
        }
        return u;
      })
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const { users } = await res.json();
      const updatedUsers = users.map((user: any) => ({
        ...user,
        joined: new Date(user.joined),
      }));

      const thisUser: User | undefined = updatedUsers.find((u: User) => u.id === profile?.id);
      if (!thisUser) return;

      if (thisUser.role >= 2) {
        setUsers(
          updatedUsers.map((u: User) => ({
            ...u,
            setRole: u.id !== thisUser.id ? (role: number) => handleRoleChange(u.id, role) : null,
          }))
        );
      } else {
        setUsers(
          updatedUsers.map((u: User) => ({
            ...u,
            setRole: null,
          }))
        );
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className={styles.bar}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {usersIcon} Manage Users ({users.length})
        </h3>
      </div>
      <input
        type="text"
        placeholder="Search users"
        className={styles.seachInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className={styles.userList}>
        <thead style={{ textAlign: "left" }}>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Joined</th>
            {users.some((u) => u.setRole) && <th>Change Role</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            // wait 500ms for inactivity, then update the list

            const namesMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
            const idMatch = user.id.includes(searchTerm);
            if (namesMatch || idMatch) {
              return <User key={idx} user={user} thisUser={profile?.id || ""}></User>;
            }
          })}
        </tbody>
      </table>
    </>
  );
}

function User({ user, thisUser }: { user: User; thisUser: string }) {
  const role = Object.keys(Roles)[user.role];
  const values = Object.values(Roles)[user.role];

  return (
    <tr>
      <td className={styles.userDesc}>
        <DiscordAvatar id={user.id} avatar={user.avatar} />
        {user.name} {user.id === thisUser && "(You)"}
      </td>
      <td>
        <RolePill role={role} color={values.color} svg={values.svg} />
      </td>
      <td>
        <time dateTime={user.joined.toISOString()}>{user.joined.toLocaleString()}</time>
      </td>
      {user.setRole && (
        <td>
          <select className={styles.roleSelect} value={user.role} onChange={(e) => user.setRole!(Number(e.target.value))}>
            {Object.entries(Roles).map(([roleName, _], idx) => (
              <option key={roleName} value={idx}>
                {roleName}
              </option>
            ))}
          </select>
        </td>
      )}
    </tr>
  );
}
