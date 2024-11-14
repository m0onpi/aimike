import { FaComments, FaCalendarCheck, FaBullhorn, FaClipboardCheck, FaPaperPlane, FaCode,FaClock,FaBolt,FaShieldAlt } from 'react-icons/fa';

const Faq = () => {
    return(
        <div className="text-center my-8">

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
          verify: { projectID: 'demo' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>`}
          </code>
        </pre>

      </div>
        <h2 className="text-4xl font-bold mb-4">Common Asked Questions</h2>
        <div className="max-w-3xl mx-auto text-left space-y-4">

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ What&apos;s included in each AI package?</h3>
            <p className="text-gray-300 mt-2">Each package includes tools and services to support different levels of automation and AI capabilities. Basic covers essential chatbots, Pro includes advanced automation, Premium adds an enhanced knowledge base, and Ultimate includes all features for comprehensive automation.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Can I upgrade my package later?</h3>
            <p className="text-gray-300 mt-2">Yes, you can upgrade your package at any time by contacting our support team. We&apos;ll adjust your plan and billing accordingly.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ How does the Installation Service work?</h3>
            <p className="text-gray-300 mt-2">The Installation Service includes a seamless integration of the selected AI tools with your website or app. Our team handles the setup for you, ensuring everything runs smoothly.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ What is an SEO Audit?</h3>
            <p className="text-gray-300 mt-2">An SEO Audit is a comprehensive analysis of your website&apos;s performance in search engines. We provide actionable recommendations to help improve visibility, optimize content, and boost rankings.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Can I get support for my AI tools?</h3>
            <p className="text-gray-300 mt-2">Yes, our 24/7 Support add-on provides continuous assistance for troubleshooting, updates, and guidance on using AI tools effectively.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Is there a limit to the number of users for the chatbot?</h3>
            <p className="text-gray-300 mt-2">Our AI chatbot can handle unlimited interactions. The chatbot&apos;s efficiency and response times are optimized for large volumes of user engagement.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ What’s the refund policy?</h3>
            <p className="text-gray-300 mt-2">We offer a 30-day satisfaction guarantee. If you&apos;re not satisfied with our service, contact us within 30 days, and we&apos;ll work to resolve any issues or provide a refund.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Do I need technical skills to use the AI tools?</h3>
            <p className="text-gray-300 mt-2">No technical skills are required! Our tools are designed to be user-friendly, and with the Installation Service, our team can handle setup for you.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ How secure is my data with these AI tools?</h3>
            <p className="text-gray-300 mt-2">We prioritize data security with all our AI tools. Our Premium and Ultimate packages also offer advanced security features to ensure data privacy and compliance.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white">✅ Can I customize the chatbot to match my brand?</h3>
            <p className="text-gray-300 mt-2">Yes, our AI chatbots are fully customizable. You can adjust the bot&apos;s responses, tone, and appearance to align with your brand identity.</p>
            </div>

        </div>
        </div>
        
    )
}

export default Faq;
