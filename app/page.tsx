"use client"
import Layout from './layout';
import ServiceCard from '../components/ServiceCard';
import { FaRobot, FaCog, FaBrain, FaLaptopCode } from 'react-icons/fa';
import { useState } from 'react';

const Home = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', number: '', gdpr: false });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdpr) {
      setMessage('You must accept the privacy policy.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Thank you for registering your interest!');
        setFormData({ firstName: '', lastName: '', email: '', number: '', gdpr: false });
      } else {
        setMessage('Failed to register your interest. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to AI Mike</h1>
        <p className="text-lg mb-6">Your go-to AI agency for innovative solutions. We provide expert AI consulting, machine learning development, and automation services to help your business thrive.</p>
        <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">Get Started</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        <ServiceCard title="AI Consulting" description="Expert AI consulting services." icon={<FaRobot />} />
        <ServiceCard title="Machine Learning" description="Advanced ML solutions." icon={<FaBrain />} />
        <ServiceCard title="Automation" description="Automate your processes." icon={<FaCog />} />
        <ServiceCard title="Software Development" description="Custom software solutions." icon={<FaLaptopCode />} />
      </div>
      <div className="my-12 p-6 bg-gray-800 text-white rounded-lg max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4">Register Your Interest</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="firstName">First Name</label>
            <input
              className="w-full p-2 text-black rounded-lg"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="lastName">Last Name</label>
            <input
              className="w-full p-2 text-black rounded-lg"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="email">Email</label>
            <input
              className="w-full p-2 text-black rounded-lg"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="number">Phone Number</label>
            <input
              className="w-full p-2 text-black rounded-lg"
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              className="mr-2"
              type="checkbox"
              id="gdpr"
              name="gdpr"
              checked={formData.gdpr}
              onChange={handleChange}
              required
            />
            <label htmlFor="gdpr">I agree to the <a href="/privacy-policy" className="underline text-blue-400">privacy policy</a></label>
          </div>
          <button
            className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            type="submit"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </Layout>
  );
};

export default Home;
