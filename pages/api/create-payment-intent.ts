// src/pages/api/create-payment-intent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, { apiVersion: '2024-04-10' }); // Replace with your actual secret key

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body; // Ensure this is provided in cents
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'gbp', // Replace with your preferred currency
        automatic_payment_methods: { enabled: true },
        
      });
      // Send the client_secret from the paymentIntent to the frontend
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
