import Layout from '../../layout';

const Consulting = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-6">AI Consulting Services</h1>
        <p className="text-lg mb-4">
          At AI Mike, we offer expert AI consulting services to help businesses leverage the power of artificial intelligence. Our team of seasoned professionals will guide you through every step of your AI journey, from strategy development to implementation.
        </p>
        <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
        <p className="text-lg mb-4">
          We start by understanding your business objectives and the challenges you face. Our consultants work closely with your team to identify opportunities where AI can create value. We then develop a customized AI strategy tailored to your specific needs.
        </p>
        <h2 className="text-3xl font-bold mb-4">Services We Offer</h2>
        <ul className="list-disc list-inside mb-4">
          <li>AI Strategy Development</li>
          <li>Data Analysis and Insights</li>
          <li>Custom AI Solutions</li>
          <li>AI Training and Workshops</li>
          <li>Ongoing Support and Optimization</li>
        </ul>
        <p className="text-lg mb-4">
          Our goal is to ensure that your AI initiatives are successful and deliver measurable results. Contact us today to learn more about how our AI consulting services can help your business.
        </p>
      </div>
    </Layout>
  );
};

export default Consulting;
