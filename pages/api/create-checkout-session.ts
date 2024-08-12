import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import prisma from "./../../lib/prisma";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const OAuth2 = google.auth.OAuth2;

const clientID = process.env.GMAIL_CLIENT_ID!;
const clientSecret = process.env.GMAIL_CLIENT_SECRET!;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN!;
const redirectURI = process.env.REDIRECT!;

const oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);
oauth2Client.setCredentials({ refresh_token: refreshToken });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { customerEmail, item } = req.body;
    
    try {
      // Create a customer if one doesn't exist
      const customer = await stripe.customers.create({
        email: customerEmail,
      });

      // Create a Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customer.id,
        line_items: [{
          price_data: {
            currency: 'gbp',
            product_data: {
              name: item.name,
            },
            unit_amount: item.amount,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
      });

      // Send session ID to client
      res.status(200).json({ sessionId: session.id });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating checkout session' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
