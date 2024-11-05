import React from 'react';
import '../styles/Settings.css';

const SupportSettings = () => {
  return (
    <div className="settings-container">
      <h2>Welcome to ShortlistPro Support!</h2>
      <p className="intro-text">
        Thank you for reaching out to ShortlistPro Support. We are here to assist you with any questions or issues you may have regarding our services.
      </p>

      <div className="contact-info">
        <h3>How to Reach Us:</h3>
        <p>Email: <a href="mailto:support@shortlistpro.com">support@shortlistpro.com</a></p>
        <p>Phone (South Africa): +27-800-123-456</p>
        <p>Support Hours: Monday to Friday, 8 AM - 5 PM (SAST)</p>
      </div>

      <div className="common-issues">
        <h3>Common Issues</h3>
        <ul>
          <li>
            <strong>Account Setup:</strong> If you need help setting up your account, please visit our <a href="#account-setup">Account Setup Guide</a>.
          </li>
          <li>
            <strong>Technical Support:</strong> For technical issues, please provide a detailed description of the problem, including any error messages you have received.
          </li>
          <li>
            <strong>Billing Inquiries:</strong> For questions about billing, please include your account number and the date of the transaction in question.
          </li>
        </ul>
      </div>

      <div className="additional-resources">
        <h3>Additional Resources</h3>
        <ul>
          <li>
            <a href="#faqs">FAQs:</a> Check out our Frequently Asked Questions for quick answers.
          </li>
          <li>
            <a href="#community-forum">Community Forum:</a> Join our Community Forum to connect with other ShortlistPro users.
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <ul className="faq-list">
          <li>
            <strong>How do I reset my password?</strong>
            <p>Go to the login page and click "Forgot Password" to reset it.</p>
          </li>
          <li>
            <strong>How can I contact support?</strong>
            <p>You can email us directly at <a href="mailto:support@ShortlistPro.com">support@ShortlistPro.com</a>.</p>
          </li>
          <li>
            <strong>How do I update my profile information?</strong>
            <p>Navigate to the profile settings to update your information.</p>
          </li>
        </ul>
      </div>

      {/* Support Form */}
      <div className="support-form">
        <h3>Get in Touch</h3>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Your name" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Your email" />

          <label htmlFor="message">Message:</label>
          <textarea id="message" placeholder="Describe your issue" rows="5"></textarea>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SupportSettings;
