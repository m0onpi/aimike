// pages/api/create-project.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const response = await fetch('https://www.freelancer.com/api/projects/0.1/projects/?compact=', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'freelancer-oauth-v1': `${process.env.FREELANCER_SANDBOX_API_KEY!}`, // Replace with your actual OAuth token
        },
        body: JSON.stringify({
          title: "Fix my PHP website", // Customize this as needed
          description: "I wrote a small website in PHP but it does not work. I need someone to fix it.", // Customize this
          currency: { id: 3 }, // Replace with appropriate currency ID
          budget: {
            minimum: 250, // Customize this
            maximum: 500, // Customize this
          },
          jobs: [{ id: 3 }, { id: 17 }], // Replace with appropriate job IDs
        }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to create project on Freelancer');
        }

        const projectId = data.result.id;

        // Update the user's record with the project ID and set hasProject to true
        await prisma.user.update({
          where: { email },
          data: { projectId: String(projectId), hasProject: true },
        });

        res.status(200).json({ success: true });
      } else {
        const textResponse = await response.text();
        throw new Error(`Unexpected response format: ${textResponse}`);
      }
    } catch (error) {
        console.error('Error creating project on Freelancer:', error);
  
        if (error instanceof Error) {
          res.status(500).json({ success: false, error: error.message });
        } else {
          res.status(500).json({ success: false, error: 'An unknown error occurred' });
        }
      }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
