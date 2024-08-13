import Layout from './layout';
import ServiceCard from '../components/ServiceCard';
import Subscribe from '../components/News';
import { FaRobot, FaCog, FaBrain, FaLaptopCode } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    
    <main>
    <Layout>
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to AI Mike</h1>
        <h2 className="text-3xl font-bold mb-4">Clear Solutions for Complex Problems.</h2>
        <p className="text-lg mb-6">Your go-to AI agency for innovative solutions. We provide expert AI consulting, machine learning development, and automation services to help your business thrive.</p>
        <Link className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600" href="/signup" passHref> Get Started </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        <ServiceCard title="AI Consulting" description="Expert AI consulting services." icon={<FaRobot />} />
        <ServiceCard title="Machine Learning" description="Advanced ML solutions." icon={<FaBrain />} />
        <ServiceCard title="Automation" description="Automate your processes." icon={<FaCog />} />
        <ServiceCard title="Software Development" description="Custom software solutions." icon={<FaLaptopCode />} />
      </div>
      <div className="text-center my-12">
          <Subscribe />
        </div>

    </Layout>

    </main>
  );
};

