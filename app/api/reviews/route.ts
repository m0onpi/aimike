// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const review = await prisma.review.create({ data });
  return NextResponse.json(review);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ message: 'Review deleted' });
}
