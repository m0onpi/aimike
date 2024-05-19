// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.DATABASE_URL,
  callbacks: {
    async session(session, user) {
      session.userId = user.id;
      return session;
    },
    async signIn(user) {
      return true;
    },
  },
});
