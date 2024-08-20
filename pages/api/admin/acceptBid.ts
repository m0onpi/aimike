// pages/api/admin/acceptBid.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { bidId } = req.body;

  try {
    // Call Freelancer API to accept the bid
    const response = await fetch(`https://www.freelancer.com/api/projects/0.1/bids/${bidId}/`, {
      method: 'PUT',
      headers: {
        'freelancer-oauth-v1': process.env.FREELANCER_LIVE_API_KEY!,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ action: 'award' }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to accept bid' });
    }

    

    res.status(200).json({ success: true, status: data.status });
  } catch (error) {
    console.error('Error accepting bid:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
