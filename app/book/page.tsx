"use client"
import Layout from '../layout';
import ServiceCard from '../../components/ServiceCard';
import PurchaseButton from "../../components/PurchaseButton"
import SubscriptionPopUp from "../../components/SubscriptionPopUp"

import { FaComments, FaCalendarCheck, FaBullhorn, FaClock, FaBolt, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';
import BookForm from '@/components/BookForm';

export default function Home() {
  return (
    <Layout>
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to AI Mike</h1>
        <h2 className="text-3xl font-bold mb-4">Clear Solutions for Complex Problems.</h2>
        <p className="text-lg mb-6">Your go-to AI agency for innovative solutions. We provide expert AI consulting, machine learning development, and automation services to help your business thrive.</p>
        <Link className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600" href="/signup" passHref> Get Started </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        <ServiceCard title="AI Chatbot with Custom Data" description="Engage customers with tailored AI chatbots built on your data." icon={<FaComments />} />
        <ServiceCard title="Appointment Setter with AI" description="Effortlessly manage client appointments with our AI-driven scheduler." icon={<FaCalendarCheck />} />
        <ServiceCard title="Lead Outreach Automation" description="Automate lead outreach and streamline engagement processes." icon={<FaBullhorn />} />
      </div>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg my-12 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Why Choose AI?</h3>
        <ul className="text-lg space-y-3">
          <li><FaClock className="inline-block mr-2 text-blue-600" /> No Days Off: Available 365 days a year.</li>
          <li><FaBolt className="inline-block mr-2 text-green-600" /> No Delays: Immediate responses at any time.</li>
          <li><FaShieldAlt className="inline-block mr-2 text-red-600" /> No Slow Replies: Consistent, quick responses.</li>
          <li><FaClock className="inline-block mr-2 text-purple-600" /> 24/7 Help: Support around the clock, every day.</li>
        </ul>
      </div>
      <PurchaseButton/>
      <SubscriptionPopUp/>
      <div className="bg-gray-800 text-center my-12">
        <BookForm />
      </div>
    </Layout>
  );
};
