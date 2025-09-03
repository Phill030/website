import { updateUserRole } from "@/lib/actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.discordProfile) return Response.json({ status: 401 });

  const { id } = await params;
  const { role } = await req.json();

  if (!id || role === undefined) return Response.json({ status: 400 });

  if (session.discordProfile.role < 2) return Response.json({ status: 403 });
  if (session.discordProfile.id === id) return Response.json({ status: 400 }); // prevent self-update
  if (role < 0 || role > 3) return Response.json({ status: 400 });

  const result = await updateUserRole(id, role);
  if (!result) return Response.json({ status: 500 });

  return Response.json({ status: 200 });
}
