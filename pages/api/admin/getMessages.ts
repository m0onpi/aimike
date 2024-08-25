// pages/api/admin/getMessages.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { threadID } = req.body;
  
  try {
    const response = await fetch(`https://www.freelancer-sandbox.com/api/messages/0.1/messages/?threads[]=${threadID}`, {
      headers: {
        'freelancer-oauth-v1': process.env.FREELANCER_SANDBOX_API_KEY!,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to fetch messages' });
    }

    res.status(200).json({ success: true, messages: data.result.messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
