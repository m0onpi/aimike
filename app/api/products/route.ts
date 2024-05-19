// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...updateData } = data;
  const product = await prisma.product.update({
    where: { id },
    data: updateData,
  });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: 'Product deleted' });
}
