// pages/api/job.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, budget, currency, jobs, userEmail } = req.body;

    try {
      // Check if the user already has a project
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (user?.hasProject) {
        return res.status(200).json({ success: true,projectId: user?.projectId });
      }

      // Call Freelancer API to create a new project
      const response = await fetch('https://www.freelancer.com/api/projects/0.1/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'freelancer-oauth-v1': process.env.FREELANCER_LIVE_API_KEY!,
        },
        body: JSON.stringify({
          title,
          description,
          currency,
          budget,
          jobs,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ success: false, error: data.message || 'Failed to create project on Freelancer' });
      }

      const projectId = data.result.id;
      const projectStatus = data.result.status;

      // Update the user's record with the project ID and set hasProject to true
      await prisma.user.update({
        where: { email: userEmail },
        data: { projectId: String(projectId) , hasProject: true },
      });

      res.status(200).json({ success: true, projectId, status: projectStatus });
    } catch (error) {
      console.error('Error creating project on Freelancer:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
