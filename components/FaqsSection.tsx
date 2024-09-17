// components/FaqsSection.tsx
'use client';

import { Disclosure } from '@headlessui/react';

const FaqsSection = () => {
  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>What is white label software?</span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-300">
                  White label software is a product developed by one company but rebranded and sold by another company as their own.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Add more FAQs as needed */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>How customizable is the software?</span>

                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-300">
                  Our software is fully customizable to match your brand identity, including logos, colors, and specific features to meet your clients' needs.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Continue adding FAQs */}
        </div>
      </div>
    </section>
  );
};

export default FaqsSection;
