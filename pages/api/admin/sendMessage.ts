// pages/api/admin/getMessages.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { threadID, message } = req.body;
  console.log(req.body)
  const mainThread = Number(threadID)
  
  try {
    const response = await fetch(`https://www.freelancer-sandbox.com/api/messages/0.1/threads/${threadID}/messages/?message=${message}`, {
        method: 'POST',
        headers: {
        'freelancer-oauth-v1': process.env.FREELANCER_SANDBOX_API_KEY!,
      },
    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to send messages' });
    }

    res.status(200).json({ success: true, messages: data });
  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
