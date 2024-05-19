// app/api/middleware/authMiddleware.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function withAuth(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req, secret });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return token;
}
