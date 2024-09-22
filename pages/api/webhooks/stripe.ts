// pages/api/webhooks/stripe.ts
import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { useSession, signOut} from 'next-auth/react';

import Stripe from 'stripe';
import prisma from '../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const config = {
  api: {
    bodyParser: false, // Stripe requires the raw body to validate the webhook signature
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      console.error('⚠️  Webhook signature verification failed.', err);
      return res.status(400).send(`Webhook Error: `);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        const customerEmail = session.customer_details?.email;

        // Update the user's payment status in the database
        if (customerEmail){
        await prisma.user.update({
          where: { email: customerEmail },
          data: { hasPaid: true },
        })};
        signOut()


        break;
              // Handle other event types if necessary
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
