"use client"
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const sendEmail = async () => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, subject, message, paymentLink }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Email sent successfully!');
    } else {
      alert('Failed to send email.');
    }
  };

  return (
    <div>
      <h1>Send Payment Link</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Payment Link"
        value={paymentLink}
        onChange={(e) => setPaymentLink(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}
