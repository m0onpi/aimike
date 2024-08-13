// pages/api/projects/[projectId].ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { projectId } = req.query;

  try {
    // Fetch project details from Freelancer API
    const response = await fetch(`https://www.freelancer-sandbox.com/api/projects/0.1/projects/${projectId}`, {
      headers: {
        'freelancer-oauth-v1': process.env.FREELANCER_SANDBOX_API_KEY!,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data.message || 'Failed to fetch project details' });
    }

    res.status(200).json({ success: true, result: data.result });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
}
