// pages/api/save-submission.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, websiteUrl, selectedPackage, additionalServices } = req.body;

    try {
      // Create the user submission with additional services
      const submission = await prisma.userSubmission.create({
        data: {
          name,
          email,
          websiteUrl,
          selectedPackage,
          additionalServices: {
            create: additionalServices.map((serviceName: string) => ({ serviceName })),
          },
        },
      });

      res.status(200).json(submission);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error saving submission' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
