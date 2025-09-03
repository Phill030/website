"use client";

import { useEffect, useState } from "react";
import styles from "./ApiKeyList.module.scss";
import ContentCreator from "../ContentCreator/ContentCreator";
import { Profile } from "@/lib/auth";
import { DiscordAvatar } from "@/lib/util";

const trashIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"
    />
  </svg>
);

const copyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      d="M6 15h-.6C4.07 15 3 13.93 3 12.6V5.4C3 4.07 4.07 3 5.4 3h7.2C13.93 3 15 4.07 15 5.4V6m-3.6 3h7.2a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4h-7.2A2.4 2.4 0 0 1 9 18.6v-7.2A2.4 2.4 0 0 1 11.4 9"
    />
  </svg>
);

const keyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </g>
  </svg>
);

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface ApiKey {
  id: number;
  name: string;
  createdAt: string;
  createdBy: User;
  delete: (() => Promise<void>) | null;
  copy: (() => Promise<void>) | null;
}

export default function ApiKeyList({ profile }: { profile: Profile | undefined }) {
  const [keys, setKeys] = useState<ApiKey[]>([]);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
    if (res.ok) {
      setKeys((prev) => prev.filter((k) => k.id !== id));
    } else {
      alert("Failed to delete key");
    }
  };

  const handleCopy = async (id: number) => {
    const res = await fetch(`/api/keys/${id}`);
    if (res.ok) {
      const { key } = await res.json();
      await navigator.clipboard.writeText(key);
    } else {
      alert("Failed to copy key");
    }
  };

  const handleCreate = async (name: string) => {
    if (!profile) {
      alert("Please log in to create an API key");
      return;
    }

    const res = await fetch(`/api/keys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const { id } = await res.json();

      const newKey = {
        id,
        name,
        createdAt: new Date().toISOString(),
        createdBy: { id: profile.id, name: profile.global_name!, avatar: profile.avatar },
        delete: () => handleDelete(id),
        copy: () => handleCopy(id),
      };

      setKeys((prev) => [...prev, newKey]);
    } else {
      alert("Failed to create key");
    }
  };

  useEffect(() => {
    // Fetch keys from API
    const fetchKeys = async () => {
      const res = await fetch(`/api/keys`);
      if (res.ok) {
        const data: { keys: Array<ApiKey> } = await res.json();
        const myId = profile?.id || "";
        setKeys(
          data.keys.map((k) => ({
            ...k,
            delete: myId == k.createdBy.id ? () => handleDelete(k.id) : null,
            copy: myId == k.createdBy.id ? () => handleCopy(k.id) : null,
          }))
        );
      }
    };

    fetchKeys();
  }, []);

  return (
    <>
      <div className={styles.bar}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {keyIcon} Manage API Keys ({keys.length})
        </h3>
      </div>
      <ContentCreator
        placeholder="Enter API key name"
        buttonText="Generate"
        handleSubmit={(value) => {
          handleCreate(value);
        }}
      />
      {keys.length > 0 ? (
        <table className={styles.table}>
          <thead style={{ textAlign: "left" }}>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <ApiKey k={key} key={key.id} userId={profile?.id || ""} />
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>No API keys found</p>
      )}
    </>
  );
}

function ApiKey({ k, userId }: { k: ApiKey; userId: string }) {
  return (
    <tr className={styles.row}>
      <td>{k.name}</td>
      <td>{new Date(k.createdAt).toLocaleString()}</td>
      <td>
        <div className={styles.userDesc}>
          <DiscordAvatar id={k.createdBy.id} avatar={k.createdBy.avatar} />
          {k.createdBy.name} {userId === k.createdBy.id && "(You)"}
        </div>
      </td>
      <td className={styles.actions}>
        {k.delete && (
          <button className={styles.deleteButton} onClick={k.delete}>
            {trashIcon} Delete
          </button>
        )}

        {k.copy && (
          <button className={styles.copyButton} onClick={k.copy}>
            {copyIcon} Copy
          </button>
        )}
      </td>
    </tr>
  );
}
