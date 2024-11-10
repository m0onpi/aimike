// src/pages/CheckoutPage.tsx
"use client";
import Layout from '../layout';
import { useState, useEffect } from 'react';
import { FaGift, FaTag, FaRocket, FaShieldAlt } from 'react-icons/fa';
import CheckoutForm from '../../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe, Appearance } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISH_KEY!}`);

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    additionalServices: [] as string[], // Ensure this is initialized as an array
});

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const packages = [
    { id: 'basic', title: 'Basic AI Chatbot', description: 'Perfect for small businesses.', price: 99.99, color: 'blue', icon: <FaTag className="text-5xl text-blue-500 mx-auto mb-4" /> },
    { id: 'pro', title: 'Pro AI Automation', description: 'Automate customer interactions.', price: 159.99, color: 'green', icon: <FaRocket className="text-5xl text-green-500 mx-auto mb-4" /> },
    { id: 'premium', title: 'Titan AI System', description: 'Includes Basic, Pro, and more.', price: 229.99, color: 'purple', icon: <FaShieldAlt className="text-5xl text-purple-500 mx-auto mb-4" /> },
    { id: 'ultimate', title: 'Ultimate AI Suite', description: 'Complete AI tools package.', price: 399.99, color: 'yellow', icon: <FaGift className="text-5xl text-yellow-500 mx-auto mb-4" /> },
  ];

  const upsells = [
    { id: 'installation', title: 'Installation Service', price: 19.99 },
    { id: 'seoAudit', title: 'SEO Audit', price: 29.99 },
    { id: 'support', title: '24/7 Support', price: 99.99 },
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
  const additionalServiceDetails = formData.additionalServices.map((serviceId) =>
    upsells.find((upsell) => upsell.id === serviceId)
  );
  const totalPrice = (selectedPackageDetails?.price || 0) + additionalServiceDetails.reduce((sum, upsell) => sum + (upsell?.price || 0), 0);

  // Reset clientSecret and create a new payment intent whenever total price changes
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalPrice * 100 }), // Convert to cents for Stripe
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
    setClientSecret(null); // Reset clientSecret before creating a new one
    if (totalPrice > 0) fetchClientSecret();
  }, [totalPrice]); // Re-run on totalPrice change

  const options: StripeElementsOptions | undefined = clientSecret
    ? { clientSecret, appearance }
    : undefined
  return (
    <Layout>
      {/* Step 1: Package Selection */}
      <div className="text-center my-6">
        <h1 className="text-4xl font-bold mb-2">Step 1: Choose Your AI Package</h1>
        <p className="text-sm mb-4 text-gray-300">Limited spots available—select your package below!</p>
        <div className="grid grid-cols-1 gap-2 p-4 max-w-3xl mx-auto">
          {packages.map((pkg) => (
            <div
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
                <p className="text-lg font-semibold text-red-500">£{pkg.price.toFixed(2)}</p>
                <button
                  className={`px-3 py-1 rounded-lg text-xs text-white ${
                    selectedPackage === pkg.id ? `bg-${pkg.color}-500` : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {selectedPackage === pkg.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Information Form and Upsells */}
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
        </div>
        <div className="bg-gray-800 p-4 rounded-lg mt-4 max-w-md mx-auto text-left">
          <h3 className="text-lg font-bold text-white mb-2">Additional Services</h3>
          {upsells.map((upsell) => (
            <label key={upsell.id} className="flex items-center mb-2 text-gray-300">
              <input
                type="checkbox"
                name="additionalServices"
                value={upsell.id}
                checked={formData.additionalServices.includes(upsell.id)}
                onChange={handleFormChange}
                className="mr-2"
              />
              {upsell.title} - £{upsell.price.toFixed(2)}
            </label>
          ))}
        </div>
      </div>

      {/* Step 3: Review and Payment */}
      <div className="text-center my-6">
        <h1 className="text-4xl font-bold mb-2">Step 3: Review and Payment</h1>
        <p className="text-sm mb-4 text-gray-300">Confirm your selection and complete your purchase.</p>
        <div className="max-w-md mx-auto bg-gray-800 p-4 rounded-lg text-left text-white">
          <h3 className="text-lg font-bold mb-2">Selected Package:</h3>
          <p>{selectedPackageDetails?.title} - £{selectedPackageDetails?.price.toFixed(2)}</p>
          
          <h3 className="text-lg font-bold mt-4 mb-2">Additional Services:</h3>
          {additionalServiceDetails.length > 0 ? (
            <ul className="list-disc list-inside">
              {additionalServiceDetails.map((service) => (
                <li key={service?.id}>{service?.title} - £{service?.price.toFixed(2)}</li>
              ))}
            </ul>
          ) : (
            <p>None</p>
          )}

          <h3 className="text-lg font-bold mt-4">Total Amount:</h3>
          <p className="text-xl font-bold text-green-400">£{totalPrice.toFixed(2)}</p>
        </div>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </div>

        <div className="text-center my-8">
        <h2 className="text-4xl font-bold mb-4">Common Asked Questions</h2>
        <div className="max-w-3xl mx-auto text-left space-y-4">

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ What&apos;s included in each AI package?</h3>
            <p className="text-gray-300 mt-2">Each package includes tools and services to support different levels of automation and AI capabilities. Basic covers essential chatbots, Pro includes advanced automation, Premium adds an enhanced knowledge base, and Ultimate includes all features for comprehensive automation.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Can I upgrade my package later?</h3>
            <p className="text-gray-300 mt-2">Yes, you can upgrade your package at any time by contacting our support team. We&apos;ll adjust your plan and billing accordingly.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ How does the Installation Service work?</h3>
            <p className="text-gray-300 mt-2">The Installation Service includes a seamless integration of the selected AI tools with your website or app. Our team handles the setup for you, ensuring everything runs smoothly.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ What is an SEO Audit?</h3>
            <p className="text-gray-300 mt-2">An SEO Audit is a comprehensive analysis of your website&apos;s performance in search engines. We provide actionable recommendations to help improve visibility, optimize content, and boost rankings.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Can I get support for my AI tools?</h3>
            <p className="text-gray-300 mt-2">Yes, our 24/7 Support add-on provides continuous assistance for troubleshooting, updates, and guidance on using AI tools effectively.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Is there a limit to the number of users for the chatbot?</h3>
            <p className="text-gray-300 mt-2">Our AI chatbot can handle unlimited interactions. The chatbot&apos;s efficiency and response times are optimized for large volumes of user engagement.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ What’s the refund policy?</h3>
            <p className="text-gray-300 mt-2">We offer a 30-day satisfaction guarantee. If you&apos;re not satisfied with our service, contact us within 30 days, and we&apos;ll work to resolve any issues or provide a refund.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Do I need technical skills to use the AI tools?</h3>
            <p className="text-gray-300 mt-2">No technical skills are required! Our tools are designed to be user-friendly, and with the Installation Service, our team can handle setup for you.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ How secure is my data with these AI tools?</h3>
            <p className="text-gray-300 mt-2">We prioritize data security with all our AI tools. Our Premium and Ultimate packages also offer advanced security features to ensure data privacy and compliance.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Can I customize the chatbot to match my brand?</h3>
            <p className="text-gray-300 mt-2">Yes, our AI chatbots are fully customizable. You can adjust the bot&apos;s responses, tone, and appearance to align with your brand identity.</p>
            </div>

        </div>
        </div>

    </Layout>
  );
}
