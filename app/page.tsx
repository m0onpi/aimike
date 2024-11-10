"use client";
import Layout from './layout';
import ServiceCard from '../components/ServiceCard';
import PurchaseButton from "../components/PurchaseButton";
import SubscriptionPopUp from "../components/SubscriptionPopUp";
import { FaComments, FaCalendarCheck, FaBullhorn, FaClipboardCheck, FaPaperPlane, FaCode,FaClock,FaBolt,FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold mb-4"> Hire a 24/7 Employee </h1>
        <h2 className="text-3xl font-bold mb-4"> With a thousand times more efficiency for a millionth of the cost </h2>
        <p className="text-lg mb-2">AI provides unmatched consistency, 24/7 availability, and exceptional efficiency, making it a powerful alternative to human hiring!</p>
        <div className="mb-4">
          <span className="text-2xl font-semibold text-gray-500 line-through">£999.99</span> 
          <span className="text-2xl font-semibold text-red-600 ml-2">£99.99</span>      
          <span className="text-xl font-semibold text-white ml-2">90% OFF</span>      
        </div>
        <Link className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" href="/checkout" passHref> Get My A.I Agent Now ! </Link>
      </div>
      
      {/* Service Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        <ServiceCard title="AI Chatbot with Custom Data" description="Engage customers with tailored AI chatbots built on your data." icon={<FaComments />} />
        <ServiceCard title="Appointment Setter with AI" description="Effortlessly manage client appointments with our AI-driven scheduler." icon={<FaCalendarCheck />} />
        <ServiceCard title="Lead Outreach Automation" description="Automate lead outreach and streamline engagement processes." icon={<FaBullhorn />} />
      </div>

      {/* Why Choose AI Section */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg my-12 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Why Choose AI?</h3>
        <ul className="text-lg space-y-3">
          <li><FaClock className="inline-block mr-2 text-blue-600" /> No Days Off: Available 365 days a year.</li>
          <li><FaBolt className="inline-block mr-2 text-green-600" /> No Delays: Immediate responses at any time.</li>
          <li><FaShieldAlt className="inline-block mr-2 text-red-600" /> No Slow Replies: Consistent, quick responses.</li>
          <li><FaClock className="inline-block mr-2 text-purple-600" /> 24/7 Help: Support around the clock, every day.</li>
        </ul>
      </div>

      {/* 3-Step Guide Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg my-12 text-center max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-white">Get Started in 3 Easy Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-4">
            <FaClipboardCheck className="text-4xl text-blue-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-white">Step 1: Choose Your Package</h4>
            <p className="text-gray-300">Select the AI chatbot package that fits your needs and goals.</p>
          </div>
          <div className="text-center p-4">
            <FaPaperPlane className="text-4xl text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-white">Step 2: Complete the Form</h4>
            <p className="text-gray-300">Provide your business details, preferences, and customization options.</p>
          </div>
          <div className="text-center p-4">
            <FaCode className="text-4xl text-purple-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-white">Step 3: Deploy Your Bot</h4>
            <p className="text-gray-300">Receive the code to easily add your chatbot to your website.</p>
          </div>
        </div>
      </div>

      {/* Example Script Section */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg my-12 text-left max-w-4xl mx-auto">
        <h4 className="text-2xl font-bold mb-4 text-center text-white">How to Add Your Bot to Your Website</h4>
        <p className="text-gray-300">Simply copy and paste the code we send you into your website&apos;s HTML, it will look somehting like this:</p>
        <pre className="bg-gray-800 text-white p-4 rounded mt-4 overflow-x-auto">
          <code>
            {`<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '672541a1ab8a75cbda26f35a' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>`}
          </code>
        </pre>
        <p className="text-gray-300">Need help with setup ? Add the installation package for just £19.99</p>

      </div>

      <PurchaseButton />
    </Layout>
  );
}
