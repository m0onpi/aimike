// src/components/CheckoutForm.tsx
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded');
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://aimike.dev/confirmation/', // Replace with your actual return URL
      },
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 max-w-lg mx-auto px-4 md:px-0">
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
            <PaymentElement />
        </div>
        </div>
        {errorMessage && (
        <div className="text-red-500 mt-2 text-sm md:text-base">
            {errorMessage}
        </div>
        )}
    </div>
    <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full md:w-auto px-6 py-2 bg-green-500 text-white rounded-lg mt-4 hover:bg-green-600 transition-all duration-150 ease-in-out"
    >
        {isProcessing ? 'Processing...' : 'Pay Now'}
    </button>
    </form>

  );
};

export default CheckoutForm;