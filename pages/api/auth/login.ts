import { compare } from 'bcryptjs';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './../../../lib/prisma'; // Adjust this import based on your setup
import { useRouter } from 'next/navigation';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  const router = useRouter();


  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    res.status(200).json({ message: 'Login successful' });
    router.push('/payment');

    
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
}
