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
            Your A.I Agent is on the way          
          </p>
          <p className="text-gray-600 mb-4">
            We have received your details and will send you the code snippet within 24 hours.
          </p>
        </div>
      </div>
    </section>
    </Layout>
  );
}
