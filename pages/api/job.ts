import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const API_URL = 'https://www.freelancer.com/api/projects/0.1/projects';
const API_KEY = process.env.FREELANCER_API_KEY; // Store your API key in an environment variable

interface FreelancerJobResponse {
    id: number;
    status: string;
}

interface ApiResponse {
    success: boolean;
    projectId?: number;
    status?: string;
    error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    if (req.method === 'POST') {
        const { title, description, budget, currency, jobs } = req.body;

        try {
            const freelancerResponse = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'freelancer-oauth-v1': `${API_KEY}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    budget,
                    currency,
                    jobs,
                }),
            });

            if (!freelancerResponse.ok) {
                const errorData = await freelancerResponse.json();
                res.status(500).json({ success: false, error: 'errorData.status' || 'Failed to create job on Freelancer' });
                return;
            }

            const data = (await freelancerResponse.json()) as FreelancerJobResponse;

            res.status(200).json({ success: true, projectId: data.id, status: data.status });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
