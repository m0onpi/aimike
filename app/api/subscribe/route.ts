// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
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
