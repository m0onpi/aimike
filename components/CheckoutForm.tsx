// Import necessary hooks and components
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Modify the CheckoutForm component
const CheckoutForm = ({ formData, selectedPackageDetails, additionalServiceDetails, totalPrice }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  // State variables
  const [isUpsellModalVisible, setIsUpsellModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number>(totalPrice);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [upsellAccepted, setUpsellAccepted] = useState<boolean>(false);

  // Handle "Pay Now" button click
  const handlePayNowClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsUpsellModalVisible(true);
  };

  // Handle the upsell choice
  const handleUpsellChoice = async (accepted: boolean) => {
    setIsUpsellModalVisible(false);
    setIsProcessing(true);
    let updatedPrice = totalPrice;
    if (accepted) {
      // Add the upsell cost to the total price
      const annualSubscriptionCost = 100; // Adjust this value accordingly
      const discount = 0.20; // 20% discount
      const discountedPrice = annualSubscriptionCost * (1 - discount);
      updatedPrice += discountedPrice;
      setFinalPrice(updatedPrice);
      setUpsellAccepted(true);
    } else {
      setUpsellAccepted(false);
    }

    // Create the payment intent with the updated price
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: updatedPrice * 100 }), // Convert to cents for Stripe
      });
      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setIsProcessing(false);
      } else {
        setErrorMessage('Error fetching client secret: ' + data.error);
        setIsProcessing(false);
      }
    } catch (error) {
      setErrorMessage('Error fetching client secret: ');
      setIsProcessing(false);
    }
  };

  // Handle the payment submission
  const handlePaymentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

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

  // Function to save the submission data
  const handleSaveSubmission = async () => {
    const data = {
      name: formData.name,
      email: formData.email,
      websiteUrl: formData.websiteUrl,
      selectedPackage: selectedPackageDetails?.title,
      additionalServices: additionalServiceDetails.map((service: any) => service?.title),
      upsellAccepted,
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
    <div className="mt-4 max-w-lg mx-auto px-4 md:px-0">
      {isUpsellModalVisible && (
        <UpsellModal
          onAccept={() => handleUpsellChoice(true)}
          onDecline={() => handleUpsellChoice(false)}
        />
      )}
      {!clientSecret && (
        <form onSubmit={handlePayNowClick}>
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full md:w-auto px-6 py-2 bg-green-500 text-white rounded-lg mt-4 hover:bg-green-600 transition-all duration-150 ease-in-out"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      )}
      {clientSecret && (
        <form onSubmit={handlePaymentSubmit}>
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
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </form>
      )}
    </div>
  );
};

// Implement the UpsellModal component
const UpsellModal = ({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Wait! One More Offer!</h2>
        <p className="mb-4">
          Upgrade to an annual subscription now and get an extra 20% OFF!
          Enjoy continuous service and additional benefits.
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

export default CheckoutForm;
