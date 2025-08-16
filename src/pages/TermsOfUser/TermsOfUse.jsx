import React from "react";

const TermsOfUse = () => {
  return (
    <div className="bg-base-100 min-h-screen py-12  text-base-content">
       <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Use</h1>
      
      <p className="mb-4">
        Welcome to CollabCorner. By accessing or using our website and services, 
        you agree to comply with and be bound by the following terms and conditions. 
        Please read them carefully.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By using our platform, you agree to these Terms of Use, as well as our Privacy Policy. 
          If you do not agree, you must not access or use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. User Accounts</h2>
        <p>
          You may need to create an account to access certain features. You are responsible 
          for maintaining the confidentiality of your account information and for all activities 
          that occur under your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. User Conduct</h2>
        <p>
          Users must not engage in any activity that is harmful, unlawful, or violates the rights 
          of others. This includes harassment, spamming, or posting offensive content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
        <p>
          All content on this platform, including text, images, logos, and code, is protected 
          by copyright and intellectual property laws. Users may not reproduce, distribute, or 
          create derivative works without explicit permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p>
          We are not liable for any damages or losses resulting from the use of our services. 
          Use the platform at your own risk. We do not guarantee uninterrupted or error-free service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Termination</h2>
        <p>
          We may suspend or terminate your access if you violate these Terms of Use or engage 
          in activities that compromise the integrity of the platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
        <p>
          We may update these Terms of Use from time to time. Users are responsible for reviewing 
          the terms periodically. Continued use constitutes acceptance of the updated terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          For any questions or concerns regarding these terms, please contact us at 
          <a className="text-primary underline ml-1" href="mailto:support@collabcorner.com">
            support@collabcorner.com
          </a>.
        </p>
      </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
