import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import prisma from "./../../lib/prisma"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const OAuth2 = google.auth.OAuth2;

const clientID = process.env.GMAIL_CLIENT_ID!;
const clientSecret = process.env.GMAIL_CLIENT_SECRET!;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN!;
const redirectURI = process.env.REDIRECT!;

const oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);
oauth2Client.setCredentials({ refresh_token: refreshToken });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST"){
    const { customerEmail, item } = req.body;
    console.log(customerEmail)
    console.log(item)
    
    try {
      // Create a customer if one doesn't exist
      const customer = await stripe.customers.create({
          email: customerEmail,
      });
      const price = await stripe.prices.create({
        currency: 'gbp',
        unit_amount: `${item.amount}`,
        product_data: {
          name: item,
        },
      });
      
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
      });




    res.status(200).json({ success: true, link: `${paymentLink.url}?prefilled_email=${encodeURIComponent(customerEmail)}`});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
  }
}else {
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
}