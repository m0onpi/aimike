// src/pages/api/create-payment-intent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, { apiVersion: '2024-04-10' }); // Replace with your actual secret key

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount,item, data} = req.body; // Ensure this is provided in cents 
      console.log(amount, item, data)




      const customer = await stripe.customers.create({
        email: "michael.pigottbiz@gmail.com",
    });

    const price = await stripe.prices.create({
      currency: "gbp",
      unit_amount: amount,
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: item,
      },
    })

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: price.id,
        },
        
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],

    });
    console.log(subscription)

      // Send the client_secret from the paymentIntent to the frontend
      res.status(200).json({clientSecret: subscription.latest_invoice.payment_intent.client_secret});
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
