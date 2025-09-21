import { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify guilds" } } // guilds 必須
    })
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) token.accessToken = account.access_token
      return token
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      return session
    }
  }
}
