import Layout from './layout';
import ServiceCard from '../components/ServiceCard';
import { FaRobot, FaCog, FaBrain, FaLaptopCode } from 'react-icons/fa';

const Home = () => {
  return (
    <Layout>
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to AI Mike</h1>
        <p className="text-lg mb-6">Welcome to AI Mike, your go-to AI agency. We provide innovative AI solutions to meet your needs.</p>
        <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">Home</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        <ServiceCard title="AI Consulting" description="Expert AI consulting services." icon={<FaRobot />} />
        <ServiceCard title="Machine Learning" description="Advanced ML solutions." icon={<FaBrain />} />
        <ServiceCard title="Automation" description="Automate your processes." icon={<FaCog />} />
        <ServiceCard title="Software Development" description="Custom software solutions." icon={<FaLaptopCode />} />
      </div>
    </Layout>
  );
};

export default Home;
