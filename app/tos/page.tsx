import Layout from '../layout';

export default function TermsAndConditionsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-6">
          Terms and Conditions
        </h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
            <p>
              Welcome to AI Mike, an AI consultancy agency providing specialized consulting services to businesses and individuals. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before booking a consultation.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. Services</h2>
            <p>
              We provide AI consultancy services, which may include but are not limited to, strategic advice, project planning, technical support, and other related services. Our consultants will work closely with you to understand your needs and provide tailored solutions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. Booking and Confirmation</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Appointment Booking:</strong> To book a consultation, you must complete the booking process on our website, selecting your preferred date and time.</li>
              <li><strong>Confirmation:</strong> Once your booking is made, you will receive a confirmation email with the details of your appointment. Please review the information carefully.</li>
              <li><strong>Non-Refundable Policy:</strong> All bookings are final. Once an appointment is confirmed, the consultation fee is non-refundable. This applies to all cancellations and rescheduling requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Rescheduling</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Rescheduling Requests:</strong> If you need to reschedule your appointment, you must do so at least 12 hours in advance by contacting our support team. However, please note that rescheduling does not entitle you to a refund.</li>
              <li><strong>No Show:</strong> If you fail to attend your scheduled appointment without prior notice, the consultation fee will be forfeited, and no refunds will be provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Payment Terms</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Consultation Fees:</strong> The fee for the consultation must be paid in full at the time of booking. We accept various payment methods, including credit/debit cards and online payment platforms.</li>
              <li><strong>Currency:</strong> All prices are quoted in £ and are subject to change without prior notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Confidentiality</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Confidential Information:</strong> We take the confidentiality of our clients&apos; information seriously. Any information shared during the consultation will be treated with strict confidentiality and will not be disclosed to third parties without your consent.</li>
              <li><strong>Use of Information:</strong> You agree that we may use your information internally to improve our services, develop new products, and enhance our customer experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Intellectual Property</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Ownership:</strong> All materials, content, and intellectual property provided during the consultation remain the property of AI Mike unless otherwise agreed in writing.</li>
              <li><strong>License:</strong> You are granted a limited, non-exclusive, non-transferable license to use the materials provided for your internal business purposes only.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Limitation of Liability</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>No Guarantees:</strong> While we strive to provide the best possible advice, we do not guarantee any specific results from our consultancy services.</li>
              <li><strong>Liability:</strong> AI Mike shall not be liable for any indirect, incidental, or consequential damages arising out of or in connection with the services provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">10. Amendments</h2>
            <p>
              We reserve the right to amend these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. It is your responsibility to review these terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">11. Contact Information</h2>
            <p>
              If you have any questions or concerns about these Terms and Conditions, please contact us at sales@aimike.dev
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
