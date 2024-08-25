// pages/api/admin/createMilestone.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { bidId, projectId, amount, description } = req.body;
  console.log(req.body)
  const project_id = Number(projectId)
  try {
    const response = await fetch(`https://www.freelancer-sandbox.com/api/projects/0.1/milestones/`, {
      method: 'POST',
      headers: {
        'freelancer-oauth-v1': process.env.FREELANCER_SANDBOX_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_id: project_id,
        bidder_id: bidId,
        amount: amount,
        description: description,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to create milestone' });
    }

    res.status(200).json({ success: true, milestone: data.result });
  } catch (error) {
    console.error('Error creating milestone:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
