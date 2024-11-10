import React from 'react';

export default function PurchaseButton() {
  return (
    <a
      href="/checkout"
      className="fixed bottom-4 inset-x-0 mx-auto bg-blue-500 text-white p-4 rounded-full shadow-lg w-max"
    >
      Purchase Now For £99.99 Only
    </a>
  );
}
