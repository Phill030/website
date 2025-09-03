import { sql } from "drizzle-orm";
import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

const apiKeys = sqliteTable("api_keys", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  createdAt: text("created_at").notNull().default(sql`current_timestamp`),
  key: text().notNull(),
});

const users = sqliteTable("users", {
  discordId: text("discord_id").notNull().unique().primaryKey(),
  name: text().notNull(),
  avatar: text().notNull(),
  firstLogin: text("first_login")
    .notNull()
    .default(sql`current_timestamp`),
  lastLogin: text("last_login")
    .notNull()
    .default(sql`current_timestamp`),
  role: int().notNull().default(0)
});

const userApiKeys = sqliteTable("user_api_keys", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull().references(() => users.discordId),
  apiKeyId: int("api_key_id").notNull().references(() => apiKeys.id),
});

export { apiKeys, users, userApiKeys };
