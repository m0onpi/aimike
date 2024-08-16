// pages/api/admin/createThread.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { members, projectId } = req.body;
  console.log(projectId)

  try {
    const response = await fetch(`https://www.freelancer-sandbox.com/api/messages/0.1/threads/?context_type=project&context=${projectId}`, {
      headers: {
        'freelancer-oauth-v1': process.env.FREELANCER_SANDBOX_API_KEY!,
      }

    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to create thread' });
    }

    res.status(200).json({ success: true, threadId: data.result.threads[0].id });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
