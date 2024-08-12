import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If user doesn't exist or password is invalid, return null
        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }

        // If everything is valid, return the user object
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          hasPaid: user.hasPaid, // Assuming you have this field
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.hasPaid = user.hasPaid; // Assuming you have this field
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.hasPaid = token.hasPaid as boolean; // Assuming you have this field
      }
      return session;
    }
  },
  pages: {
    signIn: '/', // Redirect to the login page if not authenticated
  },
};

export default NextAuth(authOptions);
