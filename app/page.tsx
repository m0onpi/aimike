"use client"
import Layout from './layout';
import ServiceCard from '../components/ServiceCard';
import { FaRobot, FaCog, FaBrain, FaLaptopCode } from 'react-icons/fa';
import { useState } from 'react';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setFormData({ name: '', email: '' });
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
            <label className="block text-left mb-2" htmlFor="name">Name</label>
            <input
              className="w-full p-2 text-black rounded-lg"
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
