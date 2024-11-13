// src/pages/CheckoutPage.tsx
"use client";
import Layout from '../layout';
import { useState, useEffect } from 'react';
import { FaGift, FaTag, FaRocket, FaShieldAlt } from 'react-icons/fa';
import CheckoutForm from '../../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe, Appearance } from '@stripe/stripe-js';
import Faq from '@/components/Faq';

const stripePromise = loadStripe(`pk_live_51MxFbnHLQ5sGQMsVD6areb2ofnCNTJW2a8Xy4QHIv9kK4aQi7WAipQMCjpZvShovDzLcv2EOEF1y5loOQ83GBmZ600JANOi2Xq`);

const appearance: Appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#ffffff',
      colorBackground: '#1a1a1a',
      colorText: '#ffffff',
      colorDanger: '#ff4d4f',
      fontFamily: 'Arial, sans-serif',
      spacingUnit: '4px',
      borderRadius: '4px',
    },
    rules: {
      '.Input': {
        backgroundColor: '#333333',
        color: '#ffffff',
        borderColor: '#444444',
      },
      '.Input:focus': {
        borderColor: '#888888',
      },
      '.Label': {
        color: '#cccccc',
      },
    },
  };

export default function CheckoutPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [addons, setAddons] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '', // Add website URL to capture it in the form
    additionalServices: [] as string[], // Ensure this is initialized as an array
});

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const packages = [
    { id: 'basic', title: 'Basic AI Chatbot', description: 'Perfect for small businesses, max 20 urls.', originalPrice : 999.99, price: 99.99, color: 'blue', icon: <FaTag className="text-5xl text-blue-500 mx-auto mb-4" /> },
    { id: 'pro', title: 'Pro AI Automation', description: 'Automate customer interactions, max 200 urls.', originalPrice : 1599.99, price: 159.99, color: 'green', icon: <FaRocket className="text-5xl text-green-500 mx-auto mb-4" /> },
    { id: 'titan', title: 'Titan AI System', description: 'Includes Basic, Pro and added appointment setter.', originalPrice : 2299.99, price: 229.99, color: 'purple', icon: <FaShieldAlt className="text-5xl text-purple-500 mx-auto mb-4" /> },
    { id: 'ultimate', title: 'Ultimate AI Suite', description: 'Includes Basic, Pro and Titan, unlimited urls.', originalPrice : 3999.99, price: 399.99, color: 'yellow', icon: <FaGift className="text-5xl text-yellow-500 mx-auto mb-4" /> },
  ];


  const handlePackageSelect = (packageId: string) => setSelectedPackage(packageId);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'additionalServices') {
      setFormData((prevData) => ({
        ...prevData,
        additionalServices: checked
          ? [...prevData.additionalServices, value]
          : prevData.additionalServices.filter((service) => service !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Calculate total price based on selected package and additional services
  const selectedPackageDetails = packages.find((pkg) => pkg.id === selectedPackage);
  const totalPrice = (selectedPackageDetails?.price || 0)

  // Reset clientSecret and create a new payment intent whenever total price changes
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalPrice * 100, // Convert to cents for Stripe
            item: selectedPackage,
            data: formData,
          }),
        });
        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('Error fetching client secret:', data.error);
        }
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    // Ensure all required fields are filled before generating clientSecret
    const isFormComplete = formData.name && formData.email && formData.websiteUrl;
    setClientSecret(null); // Reset clientSecret before creating a new one

    if (totalPrice > 0 && isFormComplete && selectedPackage) {
      fetchClientSecret();
    }
  }, [totalPrice, formData, selectedPackage]); // Run when dependencies change

  const options: StripeElementsOptions | undefined = clientSecret
    ? { clientSecret, appearance }
    : undefined
  return (
    <Layout>
      <div className="text-center my-6">
        <h1 className="text-4xl font-bold mb-2">Step 1: Choose Your AI Package</h1>
        <p className="text-sm mb-4 text-gray-300">Limited spots available—select your package below!</p>
        <div className="grid grid-cols-1 gap-2 p-4 max-w-3xl mx-auto">
        {packages.map((pkg) => {
      const originalPrice = pkg.originalPrice;
      const discountedPrice = pkg.price

      return (
        <label
          key={pkg.id}
          onClick={() => handlePackageSelect(pkg.id)}
          className={`cursor-pointer flex items-center justify-between bg-gray-800 p-2 rounded-lg shadow-lg text-left transition duration-200 ${
            selectedPackage === pkg.id ? `border-4 border-${pkg.color}-500` : 'border border-gray-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            {pkg.icon}
            <div className="text-white">
              <h3 className="text-md font-bold">{pkg.title}</h3>
              <p className="text-xs text-gray-400">{pkg.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-400 line-through">£{originalPrice.toFixed(2)}</p>
            <p className="text-lg font-semibold text-red-500">£{discountedPrice} <span className="text-sm text-green-400">(90% OFF)</span></p>
            <input
              type="radio"
              name="selectedPackage"
              value={pkg.id}
              checked={selectedPackage === pkg.id}
              onChange={() => handlePackageSelect(pkg.id)}
              className="hidden"
            />
            <button
              className={`px-3 py-1 rounded-lg text-xs text-white ${
                selectedPackage === pkg.id ? `bg-${pkg.color}-500` : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {selectedPackage === pkg.id ? 'Selected' : 'Select'}
            </button>
          </div>
        </label>
      );
    })}
        </div>
      </div>

      <div className="text-center my-6">
        <h1 className="text-4xl font-bold mb-2">Step 2: Your Information</h1>
        <p className="text-sm mb-4 text-gray-300">Fill out your details below. Spots are filling up fast!</p>
        <div className="max-w-md mx-auto text-left">
          <label className="block mb-2 text-white">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            required
          />
          <label className="block mb-2 text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            required
          />
          <label className="block mb-2 text-white">Website URL:</label>
          <input
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleFormChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            required
          />
        </div>
      </div>

      <div className="text-center my-6">
        <h1 className="text-4xl font-bold mb-2">Step 3: Review and Payment</h1>
        <p className="text-sm mb-4 text-gray-300">Confirm your selection and complete your purchase.</p>
        <div className="max-w-md mx-auto bg-gray-800 p-4 rounded-lg text-left text-white">
          <h3 className="text-lg font-bold mb-2">Selected Package:</h3>
          <p>{selectedPackageDetails?.title} - £{selectedPackageDetails?.price.toFixed(2)}</p>

          <h3 className="text-lg font-bold mt-4">Total Amount:</h3>
          <p className="text-xl font-bold text-green-400">£{totalPrice.toFixed(2)}</p>
        </div>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm 
            formData={formData} 
            selectedPackageDetails={selectedPackageDetails} 
            totalPrice={totalPrice}             
            />
          </Elements>
        )}
      </div>
          <Faq/>

    </Layout>
  );
}
