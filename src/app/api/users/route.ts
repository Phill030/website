import { getUsers } from "@/lib/actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.discordProfile) return Response.json({ status: 401 });

    const users = await getUsers();
    if (!users) return Response.json({ status: 404 });

    return Response.json({ status: 200, users });
}