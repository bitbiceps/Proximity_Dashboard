import { BrandHeader } from "../components/common/BrandHeader";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BrandHeader />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Terms and Conditions</h1>

          <section className="mb-4">
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to our website. By accessing or using our services, you agree to abide by the terms outlined in this document.
              These Terms and Conditions govern your use of our platform, ensuring a safe and lawful environment for all users.
              If you do not agree with any part of these terms, you must discontinue use immediately.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold">2. User Responsibilities</h2>
            <p className="text-gray-700">
              As a user of our platform, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Provide accurate and up-to-date information during account registration (if applicable).</li>
              <li>Use our services in compliance with all applicable laws and regulations.</li>
              <li>Refrain from engaging in fraudulent, abusive, or harmful activities that may disrupt the platform.</li>
              <li>Maintain the confidentiality of any account credentials and notify us of unauthorized access.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold">3. Privacy Policy</h2>
            <p className="text-gray-700">
              Your privacy is of utmost importance to us. We collect and process personal information as outlined in our Privacy Policy.
              This includes data collection, storage, and sharing practices, all of which comply with relevant data protection regulations.
              We do not share your personal data with third parties without your explicit consent, except as required by law.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold">4. Limitation of Liability</h2>
            <p className="text-gray-700">
              We strive to provide reliable and high-quality services, but we cannot guarantee uninterrupted or error-free access to our platform.
              By using our services, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>We are not responsible for any direct, indirect, incidental, or consequential damages resulting from your use of our platform.</li>
              <li>Service availability may be affected by factors beyond our control, including but not limited to network failures or third-party actions.</li>
              <li>Users assume full responsibility for any content they submit or share via our platform.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold">5. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify, update, or replace these Terms and Conditions at any time. Any changes will be posted on this page,
              and it is your responsibility to review them periodically. Continued use of our services following updates constitutes acceptance of the revised terms.
              If significant changes are made, we will notify users through appropriate channels.
            </p>
          </section>
          <p className="text-gray-600 mt-6 text-center">
            Thank you for using our services. Your compliance with these Terms and Conditions helps create a safe and fair platform for all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;