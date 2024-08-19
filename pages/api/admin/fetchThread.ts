// pages/api/admin/createThread.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { members, userProjectId } = req.body;
  console.log(userProjectId)
  console.log(req.body)

  try {
    const response = await fetch(`https://www.freelancer-sandbox.com/api/messages/0.1/threads/?context_type=project&context=${userProjectId}`, {
      headers: {
        'freelancer-oauth-v1': process.env.FREELANCER_SANDBOX_API_KEY!,
      }

    });

    const threads = await response.json();
    console.log(threads)

    res.status(200).json({ success: true,  threads: threads.result });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
