import NextAuth, { type Session, type User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Models from "@/db/index";

let db = new Models();
const { User, Session, Business }: any = db;

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials: any) {
        const user = await User.findByEmail(credentials.email);
        if (!user) {
          return null;
        }
        const isMatch = await user.matchPassword(credentials.password);
        if (!isMatch) {
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      if (!session.user) return;
      const userData = await User.findByEmail(session.user.email);
      if (!userData) {
        return null;
      }
      return {
        session: {
          user: {
            id: userData.id,
            businessId: userData.businessId,
            name: userData.name,
            email: userData.email,
            rol: userData.rol,
          },
        },
      };
    },
  },
  secret: process.env.ENCRYPTION_KEY,
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
