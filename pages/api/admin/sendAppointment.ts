import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import prisma from "./../../../lib/prisma"
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
      to: customerEmail,
      subject: "AI Mike Appointment",
      text: `Your appointment has been created. You can view your information here aimike.dev/dashboard`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true});
}
}