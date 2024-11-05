import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Make sure this path points to your Prisma client instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query as { date: string};

  try {
    // Convert the date query parameter to a Date object
    // Query the database for bookings on the specified date
    const users = await prisma.book.findMany({
      where: {
        date: date,
      },
      select: {
        time: true
      }
    });

    // Extract booked times
    const bookedTimes = users[0].time
    res.status(200).json({ bookedTimes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booked times',error: error });
  }
}
