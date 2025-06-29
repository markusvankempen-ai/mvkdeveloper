import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <h2>MyWebsite</h2>
          </div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Welcome to Our Amazing Website</h1>
          <p>Discover the power of modern web development with React</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="about">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Reliable</h3>
              <p>Built with modern technologies for optimal performance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Clean, modern interface that users love</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Responsive design that works on all devices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Web Development</h3>
              <p>Custom websites tailored to your needs</p>
            </div>
            <div className="service-item">
              <h3>Mobile Apps</h3>
              <p>Native and cross-platform mobile solutions</p>
            </div>
            <div className="service-item">
              <h3>Consulting</h3>
              <p>Expert advice for your digital strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: hello@mywebsite.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 MyWebsite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
