import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CheckoutForm = ({ formData, selectedPackageDetails, additionalServiceDetails, totalPrice, clientSecret, setClientSecret }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUpsellModalVisible, setIsUpsellModalVisible] = useState(false);
  const [finalPrice, setFinalPrice] = useState(totalPrice);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Show the upsell modal instead of proceeding
    setIsUpsellModalVisible(true);
  };

  // Handle upsell decision
  const handleUpsellDecision = async (accepted: boolean) => {
    setIsUpsellModalVisible(false);
    setIsProcessing(true);

    if (accepted) {
      // User accepted the upsell, update the total price
      const upsellAmount = 100; // Example upsell amount
      const discount = 0.20; // 20% discount
      const discountedUpsellPrice = upsellAmount * (1 - discount);
      const newTotalPrice = finalPrice + discountedUpsellPrice;
      setFinalPrice(newTotalPrice);

      // Update the payment intent amount on the backend
      const response = await fetch('/api/update-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(newTotalPrice * 100) }), // Convert to cents
      });
      const data = await response.json();
      if (data.success) {
        // Reinitialize the PaymentElement with the new clientSecret
        setClientSecret(data.clientSecret);
      } else {
        setErrorMessage('Failed to update payment intent.');
        setIsProcessing(false);
        return;
      }
    }

    // Proceed to confirm the payment
    await proceedWithPayment();
  };

  // Proceed with payment confirmation
  const proceedWithPayment = async () => {
    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded');
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment succeeded, save data to the database
      await handleSaveSubmission();
      router.push('/confirmation'); // Redirect to confirmation page
    } else {
      setErrorMessage('Payment could not be completed.');
    }
    setIsProcessing(false);
  };

  // Function to save the submission data to the database
  const handleSaveSubmission = async () => {
    const data = {
      name: formData.name,
      email: formData.email,
      websiteUrl: formData.websiteUrl,
      selectedPackage: selectedPackageDetails?.title,
      additionalServices: additionalServiceDetails.map((service: any) => service?.title),
      totalPrice: finalPrice,
    };

    try {
      const response = await fetch('/api/save-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Failed to save submission');
      }
    } catch (error) {
      console.error('Error saving submission:', error);
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

      {/* Upsell Modal */}
      {isUpsellModalVisible && (
        <UpsellModal onAccept={() => handleUpsellDecision(true)} onDecline={() => handleUpsellDecision(false)} />
      )}
    </form>
  );
};

export default CheckoutForm;

const UpsellModal = ({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Wait! One More Offer!</h2>
        <p className="mb-4">
          Upgrade to an annual subscription now and get an extra 20% OFF! Enjoy continuous service and additional benefits.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onDecline}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            No, thanks
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Yes, add annual subscription
          </button>
        </div>
      </div>
    </div>
  );
};
