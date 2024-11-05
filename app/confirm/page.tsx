// pages/confirmation.tsx
"use client";

import React from 'react';
import Layout from '../layout';

export default function ConfirmationPage() {
  return (
    <Layout>
    <section className="bg-gray-100 py-16 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-bold mb-4 text-black">Thank You!</h2>
          <p className="text-lg text-gray-700 mb-8">
            Your booking has been successfully submitted.
          </p>
          <p className="text-gray-600 mb-4">
            We have received your details and will contact you shortly to confirm your booking.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 bg-indigo-600 text-black py-3 px-6 rounded-full hover:bg-indigo-600 transition"
          >
            Return Home
          </button>
        </div>
      </div>
    </section>
    </Layout>
  );
}
