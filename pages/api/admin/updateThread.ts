// pages/api/updateThreadId.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, threadID } = req.body;
    console.log(req.body)

    try {
      const user = await prisma.user.update({
        where: { email: email},
        data: { threadID: threadID },
      });

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Error updating thread ID:', error);
      res.status(500).json({ success: false, error: 'Failed to update thread ID' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
