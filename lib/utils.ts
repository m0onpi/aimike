import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export async function isUserAuthenticated(context: GetServerSidePropsContext): Promise<boolean> {
  const session = await getServerSession(context.req, context.res, authOptions);
  return !!session?.user;
}

export async function hasUserPaid(context: GetServerSidePropsContext): Promise<boolean> {
  const session = await getServerSession(context.req, context.res, authOptions);
  return !!session?.user?.hasPaid;
}