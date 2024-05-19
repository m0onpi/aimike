import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (!sendgridApiKey) {
  throw new Error('SENDGRID_API_KEY is not defined in environment variables');
}

sendgrid.setApiKey(sendgridApiKey);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await sendgrid.send({
      to: email,
      from: 'your-email@example.com',
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to our mailing list!',
    });

    return NextResponse.json({ message: 'Subscription successful' });
  } catch (error) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
