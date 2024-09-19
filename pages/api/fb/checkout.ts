// pages/api/fb/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

function hashData(data: string) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, phone, firstName, lastName } = req.body;
    try {
      // Hash sensitive data (email, phone, firstName, lastName)
      const hashedEmail = email ? hashData(email) : null;
      const hashedPhone = phone ? hashData(phone) : null;
      const hashedFirstName = firstName ? hashData(firstName) : null;
      const hashedLastName = lastName ? hashData(lastName) : null;

      const eventData = {
        event_name: 'Checkout',
        event_time: Math.floor(new Date().getTime() / 1000),
        action_source: 'website',
        user_data: {
          em: hashedEmail ? [hashedEmail] : [], // Array of hashed email
          ph: hashedPhone ? [hashedPhone] : [], // Array of hashed phone
          fn: hashedFirstName ? [hashedFirstName] : [], // Array of hashed first name
          ln: hashedLastName ? [hashedLastName] : [], // Array of hashed last name
        },
      };

      // Debugging: Log the event data before sending
      console.log('Event data being sent to Facebook:', JSON.stringify([eventData]));

      // Make the request to Facebook Conversion API
      const fbResponse = await fetch(
        `https://graph.facebook.com/v11.0/${process.env.FB_PIXEL_ID}/events?access_token=${process.env.FB_ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            data: JSON.stringify([eventData]), // Send event data as a stringified array
          }),
        }
      );

      if (!fbResponse.ok) {
        const errorText = await fbResponse.text();
        console.error('Facebook API Error:', errorText); // Log the response error
        throw new Error(`Facebook API responded with status ${fbResponse.status}: ${errorText}`);
      }

      const fbResponseData = await fbResponse.json();

      res.status(200).json({ success: true, fbResponse: fbResponseData });
    } catch (error) {
      console.error('Error sending event to Facebook:', error);
      res.status(500).json({ error: 'Error sending event to Facebook' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
