import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-base-100 min-h-screen py-12  text-base-content">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">
          At CollabCorner, your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your information when you
          use our services.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p>
            We may collect information that you provide directly, such as your
            name, email, profile information, and content you post. We also
            automatically collect data such as your IP address, device
            information, and browsing behavior on our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is used to provide and improve our services,
            personalize your experience, communicate important updates, and
            prevent fraud or abuse. We may also use aggregated and anonymized
            data for analytics and research purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            3. Sharing Your Information
          </h2>
          <p>
            We do not sell your personal information. We may share your
            information with trusted third-party service providers to operate
            our platform or comply with legal requirements. We may also share
            aggregated or anonymized data publicly.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            4. Cookies and Tracking
          </h2>
          <p>
            We may use cookies, local storage, and similar technologies to
            enhance your experience, analyze usage, and deliver personalized
            content. You can manage your cookie preferences in your browser
            settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            5. Security of Your Information
          </h2>
          <p>
            We implement reasonable technical and organizational measures to
            protect your data. However, no system is completely secure, and we
            cannot guarantee absolute security of your information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information. You may also opt out of marketing communications at any
            time.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            users of significant changes, and continued use of the platform
            constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at
            <a
              className="text-primary underline ml-1"
              href="mailto:support@collabcorner.com"
            >
              support@collabcorner.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
