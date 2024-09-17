// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Unlock AI-Powered Growth</h1>
          <p className="text-xl mb-8">Transform your business with cutting-edge AI strategies tailored to your needs.</p>
          <Link className="bg-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition" href="#booking">
            Book Your Free Consultation
          </Link>
        </div>
      </section>

      {/* Video Introduction */}
      <section className="py-16 bg-gray-800" id="video">
        <div className="max-w-4xl mx-auto px-4">
          <div className="aspect-w-16 aspect-h-9">
            <iframe src="https://www.youtube.com/embed/your-video-id" title="AI Mike Introduction" allowFullScreen className="w-full h-full rounded-lg"></iframe>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose AI Mike?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Customized AI Solutions</h3>
              <p>We tailor strategies specifically to your business goals and industry.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Proven Results</h3>
              <p>Our clients have seen up to 300% growth after implementing our AI strategies.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Expert Guidance</h3>
              <p>Work directly with industry experts to navigate the AI landscape.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Trusted by Leading Businesses</h2>
          <div className="flex flex-wrap justify-center items-center space-x-6">
            <img src="/logo1.png" alt="Company 1" className="h-12" />
            <img src="/logo2.png" alt="Company 2" className="h-12" />
            <img src="/logo3.png" alt="Company 3" className="h-12" />
            {/* Add more logos as needed */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16" id="booking">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8">Book your free consultation today and discover the potential of AI.</p>
          <Link className="bg-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition" href="/discovery-call">
            Schedule My Call
          </Link>
        </div>
      </section>
    </div>
  );
}
