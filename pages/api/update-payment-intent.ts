// /api/update-payment-intent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
    apiVersion: '2024-04-10',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount,
    });

    res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error updating payment intent:', error);
    res.status(500).json({ success: false, error });
  }
};
