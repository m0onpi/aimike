import { NextApiRequest, NextApiResponse } from 'next';
import { fetchChartData } from '../webhooks/tradingview';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      console.log('Request Body:', req.body);

      let data;
      if (typeof message === 'string') {
        data = JSON.parse(message);
      } else {
        data = message;
      }
      console.log('Parsed Message:', data);

      // Run fetchChartData after receiving a successful message
      const chartData = await fetchChartData(data);

      // Send a successful response
      return res.status(200).json({ success: true, data, chartData });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      // Handle GET request
      
      
      const chartData = await fetchChartData(req.query);
      return res.status(200).json({ message: 'GET request received', chartData });
    } catch (error) {
      console.error('Error processing GET request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // If the request method is neither GET nor POST
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
