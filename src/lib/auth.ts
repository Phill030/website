import { DefaultUser, NextAuthOptions } from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import { DefaultJWT } from "next-auth/jwt";
import { createUser, isUserAuthorized } from "./actions";

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env;

export interface Profile extends DiscordProfile {
  global_name?: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    discordProfile?: Profile;
    user: DefaultUser & { discordId?: string };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    discordId?: string;
    discordProfile?: Profile;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID!,
      clientSecret: DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify guilds guilds.members.read",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        if (account.provider !== "discord") {
          throw new Error("Unsupported Provider");
        }

        token.accessToken = account.access_token;
        token.discordId = user.id;

        if ((user as any).discordProfile) {
          token.discordProfile = (user as any).discordProfile;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.discordId = token.discordId;
        session.discordProfile = token.discordProfile;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (!profile) {
        throw new Error("Profile is null in sign in function");
      }

      if (!account) {
        throw new Error("Account is null in sign in function");
      }

      if (account.provider !== "discord") {
        throw new Error("Unsupported provider: " + account.provider);
      }

      (user as any).discordProfile = profile as DiscordProfile;
      const created = await createUser(user.id, (user as any).discordProfile.global_name, (user as any).discordProfile.avatar);
      if (!created) {
        throw new Error("User creation failed (Database Error)");
      }

      // Check if user is authorized
      const isAuthorized = await isUserAuthorized(user.id);
      if (!isAuthorized) {
        throw new Error("User is not authorized");
      }

      return created;
    },
  },
  pages: {
    signIn: "/admin/auth",
  },
};
