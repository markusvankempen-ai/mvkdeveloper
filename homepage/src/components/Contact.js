import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container container">
      <div className="contact-content content-card">
        <h2>Contact Us</h2>
        <p className="intro-text">Have questions? We'd love to hear from you!</p>
        
        <hr className="divider" />
        
        <section className="contact-section">
          <h3>Contact Information</h3>
          <ul className="contact-info-list">
            <li><strong>Email (General):</strong> <a href="mailto:info@cranfordpub.com">info@cranfordpub.com</a></li>
            <li><strong>Email (Orders):</strong> <a href="mailto:orders@cranfordpub.com">orders@cranfordpub.com</a></li>
            <li><strong>Email (Paul Cranford):</strong> <a href="mailto:psc@cranfordpub.com">psc@cranfordpub.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:19029292391">1-902-929-2391</a> <span className="note">(9 AM - 6 PM AST, most days)</span></li>
            <li><strong>Toll Free (North America):</strong> <a href="tel:18669292391">1-866-929-2391</a> <span className="note">(9 AM - 6 PM AST, most days)</span></li>
            <li><strong>Fax/Voicemail:</strong> <a href="tel:18888608073">1-888-860-8073</a> <span className="note">(24 hr high fidelity Voicemail / FAX)</span></li>
            <li><strong>Alternate Fax:</strong> <a href="tel:18888601172">1-888-860-1172</a></li>
            <li><strong>eFax:</strong> <a href="tel:19024847809">1-902-484-7809</a></li>
            <li><strong>Address:</strong> <span>44549 Cabot Trail, RR#1 Englishtown, Cape Breton Island, Nova Scotia, Canada B0C 1H0</span></li>
          </ul>
          <p className="contact-note">We are a home-based mailorder business without a storefront.</p>
        </section>
        
        <hr className="divider" />
        
        <section className="contact-section">
          <h3>Ordering & Payment</h3>
          <ul className="mail-order-list">
            <li>We accept <strong>major credit cards</strong> (Visa, MasterCard, American Express)</li>
            <li><strong>PayPal</strong> payments accepted</li>
            <li><strong>Money orders</strong> and <strong>certified cheques</strong> in Canadian or US funds</li>
            <li>All prices are in <strong>Canadian dollars</strong></li>
            <li><strong>Free shipping</strong> within Canada on orders over $50</li>
            <li><strong>International shipping</strong> available - contact us for rates</li>
          </ul>
        </section>
        
        <hr className="divider" />
        
        <section className="contact-section">
          <h3>Business Information</h3>
          <ul className="tax-info-list">
            <li><strong>HST Registration:</strong> 89023 4395 RT0001</li>
            <li><strong>Business Hours:</strong> 9:00 AM - 6:00 PM AST, most days</li>
            <li><strong>Established:</strong> 1979 (40+ years in business)</li>
            <li><strong>Specialization:</strong> Celtic fiddle music from Cape Breton, Ireland, and Scotland</li>
          </ul>
          <p className="contact-note"><strong>Please note:</strong> We are a small, family-run business. Response times may vary, but we strive to respond to all inquiries within 24-48 hours during business days.</p>
        </section>
      </div>
    </div>
  );
};

export default Contact; 