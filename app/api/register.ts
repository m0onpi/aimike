import { NextApiRequest, NextApiResponse } from 'next';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    try {
      const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name,
        },
      });
      res.status(200).json({ message: 'Registration successful', response });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
