import { deleteApiKey, getApiKey } from "@/lib/actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.discordProfile) return Response.json({ success: false }, { status: 401 });

  const { id } = await params;
  const keyId = parseInt(id, 10);
  const success = await deleteApiKey(session.discordProfile.id, keyId);

  return Response.json({ success });
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.discordProfile) return Response.json({ success: false }, { status: 401 });

  const { id } = await params;
  const keyId = parseInt(id, 10);
  const key = await getApiKey(session.discordProfile.id, keyId);

  if (!key) return Response.json({ success: false }, { status: 404 });

  return Response.json({ success: true, key });
}