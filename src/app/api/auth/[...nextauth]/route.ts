import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Models from "@/db/index";

let db = new Models();
const { User, Session, Business }: any = db;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      //@ts-ignore
      async authorize(credentials: any) {
        const user = await User.findByEmail(credentials.email);

        // Check if user exists
        if (!user) {
          return null;
        }

        // Validate password
        const isMatch = await user.matchPassword(credentials.password);

        if (!isMatch) {
          return null;
        }

        return {
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
  secret: process.env.ENCRYPTION_KEY,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
