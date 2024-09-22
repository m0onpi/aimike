'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut} from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: session?.user?.email,
          item: {
            currency: 'gbp',
            amount: 9999, // £99.99
            description: 'AI Mike Consultancy Appointment',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      const data = await response.json();
      if (data.success) {
        router.push(`${data.link}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;

  }

  if (session?.user.hasPaid){
    router.push('/dashboard')
  }

  if (!session) {
    return <div>Please log in to make a payment.</div>;
  }

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8 text-white">
  <div className="max-w-md w-full space-y-8">
    <div className="text-center">
      <h2 className="text-4xl font-extrabold">
        Secure Your AI Consultation
      </h2>
      <p className="mt-4 text-lg">
        Unlock the full potential of AI for your business with our expert consultation. Get personalized advice tailored to your unique needs.
      </p>
    </div>
    <div className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg text-gray-900">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow">
        <span className="text-lg font-medium">AI Consultant Appointment</span>
        <span className="text-2xl font-semibold text-grey-500 line-through">£199.99</span> 
        <span className="text-2xl font-semibold text-red-600 ml-2">£99.99</span>      
        </div>
      <div className="mt-4 text-sm">
        <p><strong>What&apos;s Included:</strong></p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>30-45 minutes personalized AI consultation</li>
          <li>Comprehensive AI integration strategy</li>
          <li>Follow-up report with actionable insights</li>
          <li>Exclusive access to future AI resources</li>
        </ul>
      </div>
      <div className="mt-6">
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        <p className="mt-4 text-xs text-gray-600 text-center">
          Your satisfaction is our priority. If you&apos;re not completely satisfied with your consultation, contact us within 24 hours.
        </p>
        <div className="text-center text-red-500 mt-8">
      <p className="text-xl text-gray">
        Limited Time Offer: Book now and receive a full consultation refund and 25% discount on your main project!
      </p>
    </div>
      </div>
    </div>
    <button
          onClick={() => signOut()}
          className="inline-block bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
  </div>
</div>

  );
}
