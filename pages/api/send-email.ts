import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const OAuth2 = google.auth.OAuth2;

const clientID = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN!;
const redirectURI = 'http://localhost:3000/api/auth/callback';

const oauth2Client = new OAuth2(clientID, clientSecret, redirectURI);
oauth2Client.setCredentials({ refresh_token: refreshToken });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, subject, message, paymentLink } = req.body;

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'sales@aimike.dev',
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'sales@aimike.dev',
      to: email,
      subject: subject,
      text: `${message}\n\nPayment Link: ${paymentLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
}
