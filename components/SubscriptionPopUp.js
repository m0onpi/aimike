// src/components/SubscriptionPopup.js
import React, { useState, useEffect } from 'react';

const SubscriptionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); // Show popup after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    isOpen && (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto relative">
          {/* Close Button in Top Right with Larger "X" */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
          <h2 className="text-center text-black font-bold">Sign up To Unlock</h2>
          <h2 className="text-center text-black font-bold">Extra 10% Discount ! 🔥</h2>
          <h3 className="text-center text-black font-bold">Be the first to hear about our new A.I services</h3>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-2 w-full text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 mt-2 w-full"
            >
              GET MY DISCOUNT
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default SubscriptionPopup;
