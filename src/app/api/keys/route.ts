import { createApiKey, getApiKeys, getApiKeysForUser, isUserAuthorized } from "@/lib/actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(/*request: Request*/) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.discordProfile) return Response.json({ status: 401 });

  const isAuthorized = await isUserAuthorized(session.discordProfile.id);
  if (!isAuthorized) return Response.json({ success: false }, { status: 403 });

  const keys = await getApiKeys();
  if (!keys) return Response.json({ status: 404 });

  return Response.json({ keys });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.discordProfile) return Response.json({ success: false }, { status: 401 });

  const isAuthorized = await isUserAuthorized(session.discordProfile.id);
  if (!isAuthorized) return Response.json({ success: false }, { status: 403 });

  const { name } = await req.json();
  if (!name || name.length > 32) return Response.json({ success: false }, { status: 400 });
  const keys = await getApiKeysForUser(session.discordProfile.id);
  if (keys.length >= 1) return Response.json({ success: false }, { status: 429 });

  const id = await createApiKey(session.discordProfile.id, name);

  return Response.json({ id });
}
