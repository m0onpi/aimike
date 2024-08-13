// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultUser } from "next-auth";


declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    hasPaid: boolean;
    password: string | null;
    hasProject: boolean;
    projectId: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      hasPaid: boolean;
      hasProject: boolean;
      projectId?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    hasPaid: boolean;
    hasProject: boolean;
    projectId: string;
  }
}
