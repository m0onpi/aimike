// pages/api/admin/userDetails/[userID].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userID } = req.query;

  const id = Array.isArray(userID) ? userID[0] : userID;


  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
}
