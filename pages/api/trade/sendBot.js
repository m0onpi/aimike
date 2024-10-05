import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST request
    try {
      const { message } = req.body;
      return res.status(200).json(message); // Exit after sending response
    } catch (error) {
      console.error('Error saving alert:', error);
      return res.status(500).json({ error: 'Error saving alert' }); // Exit after sending response
    }
  } else if (req.method === 'GET') {
    // Handle GET request
    return res.status(200); // Exit after sending response
  }

  // If the request method is neither GET nor POST
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`); // Exit after sending response
}