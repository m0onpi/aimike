// pages/api/admin/fetchBids.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userProjectId } = req.body;

  try {

    if (!userProjectId) {
      return res.status(400).json({ error: 'User has no project' });
    }

    // Fetch bids from the Freelancer API
    const response = await fetch(`https://www.freelancer-sandbox.com/api/projects/0.1/projects/${userProjectId}/bids`, {
      headers: {
        'freelancer-oauth-v1': process.env.FREELANCER_SANDBOX_API_KEY!,
      },
    });

    const bids = await response.json();
    console.log(bids.result.bids)

    if (!response.ok) {
      return res.status(response.status).json({ error: bids.message || 'Failed to fetch bids' });
    }

    // Optionally store bids in your database
    // Example: await prisma.bid.createMany({ data: bids.result });

    res.status(200).json({ success: true, bids: bids.result });
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
