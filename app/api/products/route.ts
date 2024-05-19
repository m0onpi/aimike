// app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function isAuthenticated(req: NextRequest) {
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session;
}

export async function GET(req: NextRequest) {
  const session = await isAuthenticated(req);
  if (!session) return session;

  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await isAuthenticated(req);
  if (!session) return session;

  const { name, description, price, stock } = await req.json();
  const product = await prisma.product.create({
    data: { name, description, price, stock },
  });
  return NextResponse.json(product, { status: 201 });
}

// Continue similarly for PUT and DELETE methods
