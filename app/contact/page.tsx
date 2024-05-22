import Layout from '../layout';

const Contact = () => {
  return (
    <Layout>
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-6">We&apos;d love to hear from you! Reach out to us at:</p>
        <p className="text-lg mb-6">Email: <a href="mailto:sales@aimike.dev" className="text-blue-400 hover:underline">sales@aimike.dev</a></p>
      </div>
    </Layout>
  );
};

export default Contact;
