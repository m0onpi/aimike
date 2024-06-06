import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const OAuth2 = google.auth.OAuth2;

const clientID = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN!;
const redirectURI = 'http://localhost:3000/api/auth/callback';

const oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);
oauth2Client.setCredentials({ refresh_token: refreshToken });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { customerEmail, item } = req.body;
    if (!customerEmail || !item) {
      return res.status(400).json({ error: 'Customer email and item are required' });
  }
  try {
    // Create a customer if one doesn't exist
    const customer = await stripe.customers.create({
        email: customerEmail,
    });

    const price = await stripe.prices.create({
      currency: item.currency,
      unit_amount: item.amount,
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: item.description,
      },
    })

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'sales@aimike.dev',
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken.token,
      },
    }as SMTPTransport.Options);

    const mailOptions = {
      from: 'sales@aimike.dev',
      to: customer.email,
      subject: "Invoice",
      text: `Payment Link: ${paymentLink.url}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error sending email' });
  } 
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
