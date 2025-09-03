"use server";
import { db } from "@/lib/db";
import { apiKeys, userApiKeys, users } from "@/db/schema";
import { eq, sql, and, gte } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

async function createUser(discordId: string, name: string, avatar: string): Promise<boolean> {
  try {
    await db
      .insert(users)
      .values({ discordId, name, avatar })
      .onConflictDoUpdate({
        target: users.discordId,
        targetWhere: eq(users.discordId, discordId),
        set: { lastLogin: sql`current_timestamp`, name, avatar },
      })
      .execute();

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

async function getUsers(): Promise<Array<{ id: string; name: string; avatar: string; role: number; joined: string }>> {
  const userList = await db
    .select({ id: users.discordId, name: users.name, avatar: users.avatar, role: users.role, joined: users.firstLogin })
    .from(users)
    .execute();

  return userList;
}

async function isUserAuthorized(userId: string): Promise<boolean> {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.discordId, userId), gte(users.role, 1)))
    .execute();

  return user.length == 1;
}

async function updateUserRole(userId: string, role: number): Promise<boolean> {
  try {
    await db.update(users).set({ role }).where(eq(users.discordId, userId)).execute();

    return true;
  } catch (error) {
    console.error("Error updating user role:", error);
    return false;
  }
}

async function getApiKey(discordId: string, apiKeyId: number): Promise<string | null> {
  const key = await db
    .select({ key: apiKeys.key })
    .from(apiKeys)
    .innerJoin(userApiKeys, eq(apiKeys.id, userApiKeys.apiKeyId))
    .where(and(eq(userApiKeys.userId, discordId), eq(apiKeys.id, apiKeyId)))
    .execute();

  return key.length > 0 ? key[0].key : null;
}

async function getApiKeys(): Promise<
  Array<{ id: number; name: string; createdBy: { id: string; name: string; avatar: string }; createdAt: string }>
> {
  const keys = await db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      createdBy: { id: users.discordId, name: users.name, avatar: users.avatar },
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .innerJoin(userApiKeys, eq(apiKeys.id, userApiKeys.apiKeyId))
    .innerJoin(users, eq(userApiKeys.userId, users.discordId))
    .execute();

  return keys;
}

async function getApiKeysForUser(
  userId: string
): Promise<Array<{ id: number; name: string; createdBy: { id: string; name: string; avatar: string }; createdAt: string }>> {
    console.log(userId);

  const keys = await db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      createdBy: { id: users.discordId, name: users.name, avatar: users.avatar },
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .innerJoin(userApiKeys, eq(apiKeys.id, userApiKeys.apiKeyId))
    .innerJoin(users, eq(userApiKeys.userId, users.discordId))
    .where(eq(users.discordId, userId))
    .execute();

  return keys;
}

async function deleteApiKey(discordId: string, apiKeyId: number): Promise<boolean> {
  try {
    await db.transaction(async (tx) => {
      await tx
        .delete(userApiKeys)
        .where(and(eq(userApiKeys.userId, discordId), eq(userApiKeys.apiKeyId, apiKeyId)))
        .execute();

      await tx.delete(apiKeys).where(eq(apiKeys.id, apiKeyId)).execute();
    });

    return true;
  } catch (error) {
    console.error("Error deleting API key:", error);
    return false;
  }
}

async function createApiKey(discordId: string, name: string): Promise<number | null> {
  try {
    const result = await db.transaction(async (tx) => {
      const uuid = uuidv4();

      const apiKeyId: Array<{ id: number }> = await tx.insert(apiKeys).values({ key: uuid, name }).returning({ id: apiKeys.id });

      const userApiKey: Array<{ id: number }> = await tx
        .insert(userApiKeys)
        .values({ userId: discordId, apiKeyId: apiKeyId[0].id })
        .returning({ id: userApiKeys.id });

      return userApiKey.length > 0 ? apiKeyId[0].id : null;
    });

    return result;
  } catch (error) {
    console.error("Error creating API key:", error);
    return null;
  }
}

export { createUser, getUsers, isUserAuthorized, updateUserRole, getApiKey, getApiKeysForUser, deleteApiKey, createApiKey, getApiKeys };
