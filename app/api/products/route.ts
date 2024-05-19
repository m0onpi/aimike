// app/api/products/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function isAuthenticated(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  return session;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await isAuthenticated(req, res);
  if (!session) return;

  const products = await prisma.product.findMany();
  res.status(200).json(products);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await isAuthenticated(req, res);
  if (!session) return;

  const { name, description, price, stock } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, stock },
  });
  res.status(201).json(product);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const session = await isAuthenticated(req, res);
  if (!session) return;

  const { id, name, description, price, stock } = req.body;
  const product = await prisma.product.update({
    where: { id },
    data: { name, description, price, stock },
  });
  res.status(200).json(product);
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const session = await isAuthenticated(req, res);
  if (!session) return;

  const { id } = req.body;
  await prisma.product.delete({ where: { id } });
  res.status(204).end();
}
