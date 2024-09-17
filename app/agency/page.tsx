// pages/white-label.tsx
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import FaqsSection from '../../components/FaqsSection';

const WhiteLabel: NextPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>AI Mike | White Label Software Offer</title>
        <meta
          name="description"
        content="Discover AI Mike's white label software solutions to elevate your business offerings."
        />
      </Head>

      {/* Hero Section */}
      <section
        className="flex items-center justify-center py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/whitelabel-hero.jpg)' }}
      >
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            Elevate Your Business with Our White Label Software Solutions
          </h1>
          <p className="text-xl mb-8">
            Offer cutting-edge AI-powered software under your brand and grow your revenue exponentially.
          </p>
          <Link className="bg-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition" href="#contact">
              Get Started Today
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our White Label Solutions?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/images/customizable.svg" alt="Customizable" className="h-20 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Fully Customizable</h3>
              <p>Rebrand our software to match your brand identity seamlessly.</p>
            </div>
            <div className="text-center">
              <img src="/images/scalable.svg" alt="Scalable" className="h-20 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Scalable & Reliable</h3>
              <p>Our solutions grow with your business, ensuring consistent performance.</p>
            </div>
            <div className="text-center">
              <img src="/images/support.svg" alt="Support" className="h-20 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Dedicated Support</h3>
              <p>Get access to our expert team for seamless integration and ongoing assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">How It Works</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <img src="/images/step1.svg" alt="Step 1" className="w-full" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-2xl font-semibold mb-2">Step 1: Consultation</h3>
                <p>
                  We discuss your business needs and identify how our software can be tailored to your brand.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:order-2">
                <img src="/images/step2.svg" alt="Step 2" className="w-full" />
              </div>
              <div className="md:w-1/2 md:pr-8 md:order-1">
                <h3 className="text-2xl font-semibold mb-2">Step 2: Customization</h3>
                <p>
                  Our team customizes the software to align with your branding and functional requirements.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <img src="/images/step3.svg" alt="Step 3" className="w-full" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-2xl font-semibold mb-2">Step 3: Launch & Support</h3>
                <p>
                  We assist you in launching the software to your clients and provide ongoing support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <FaqsSection />

      {/* Call to Action Section */}
      <section className="py-16" id="contact">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Offerings?</h2>
          <p className="text-xl mb-8">
            Contact us today to learn more about our white label solutions and how they can benefit your business.
          </p>
          <Link className="bg-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition" href="/contact">
              Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WhiteLabel;
