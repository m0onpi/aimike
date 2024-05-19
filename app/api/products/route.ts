// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { withAuth } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = await withAuth(req, NextResponse);
  if (token instanceof NextResponse) {
    return token;
  }

  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const token = await withAuth(req, NextResponse);
  if (token instanceof NextResponse) {
    return token;
  }

  const body = await req.json();
  const { name, description, price, stock } = body;
  const product = await prisma.product.create({
    data: { name, description, price, stock },
  });
  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const token = await withAuth(req, NextResponse);
  if (token instanceof NextResponse) {
    return token;
  }

  const body = await req.json();
  const { id, name, description, price, stock } = body;
  const product = await prisma.product.update({
    where: { id },
    data: { name, description, price, stock },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const token = await withAuth(req, NextResponse);
  if (token instanceof NextResponse) {
    return token;
  }

  const body = await req.json();
  const { id } = body;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({}, { status: 204 });
}
