import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const OAuth2 = google.auth.OAuth2;

const clientID = process.env.GMAIL_CLIENT_ID!;
const clientSecret = process.env.GMAIL_CLIENT_SECRET!;
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
      from: 'Ai Mike <sales@aimike.dev>',
      to: customer.email,
      subject: "Your Invoice from Aimike",
      text: `Dear ${customer.name},
    
    We hope this message finds you well. Please find your invoice attached.
    
    Payment Link: ${paymentLink.url}
    
    Thank you for your business.
    
    Best regards,
    The Aimike Team`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #333;">Hello ${customer.name},</h2>
            <p>We hope this message finds you well. Please find your invoice below:</p>
            <p><strong>Payment Link:</strong> <a href="${paymentLink.url}" style="color: #1a73e8;">${paymentLink.url}</a></p>
            <p>Thank you for your business.</p>
            <p>Best regards,<br>The Aimike Team</p>
          </body>
        </html>
      `
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
