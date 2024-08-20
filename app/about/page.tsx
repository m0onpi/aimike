"use client"
import Layout from '../layout';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-6">About AI Mike</h1>
        <p className="text-lg mb-4">
          AI Mike is a leading AI agency dedicated to providing innovative artificial intelligence solutions to businesses of all sizes. Our mission is to empower companies to harness the power of AI to drive growth, improve efficiency, and stay ahead of the competition.
        </p>
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <p className="text-lg mb-4">
          Founded by industry experts with years of experience in AI and machine learning, AI Mike has quickly grown to become a trusted partner for organizations looking to leverage AI technology. Our team of skilled professionals is passionate about pushing the boundaries of what AI can achieve.
        </p>
        <h2 className="text-3xl font-bold mb-4">Our Values</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Innovation: We strive to stay at the forefront of AI technology and continuously explore new ways to solve problems.</li>
          <li>Excellence: We are committed to delivering the highest quality solutions and services to our clients.</li>
          <li>Collaboration: We believe in working closely with our clients to understand their unique needs and deliver tailored solutions.</li>
          <li>Integrity: We conduct our business with the highest ethical standards and transparency.</li>
        </ul>
        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
        <p className="text-lg mb-4">
          Our team consists of AI specialists, data scientists, software engineers, and business strategists who are all dedicated to helping you achieve your goals. We bring a wealth of knowledge and expertise to every project, ensuring that our solutions are both innovative and effective.
        </p>
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg mb-4">
          We would love to hear from you! Whether you have a question about our services or want to discuss how AI can benefit your business, our team is here to help. Contact us today to learn more about what AI Mike can do for you.
        </p>
      </div>
    </Layout>
  );
};

export default About;
