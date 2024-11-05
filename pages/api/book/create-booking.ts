// pages/api/create-user.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Ensure you're importing prisma correctly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Destructure and type your request body
  const { name, email, phone, date, time} = req.body as {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
  };

  try {
    // Use Prisma's upsert method
    const user = await prisma.book.upsert({
      where: { email },
      update: {
        name,
        phone,
        date,
        time,
      },
      create: {
        name,
        email,
        phone,
        date,
        time,
      },
    });

    // Determine if the user was created or updated based on the operation

    res.status(200).json({ message: "Success", user });
  } catch (error) {
    console.error('Error creating or updating user:', error);
    res.status(500).json({ message: 'Error creating or updating user', error: error });
  }
}
