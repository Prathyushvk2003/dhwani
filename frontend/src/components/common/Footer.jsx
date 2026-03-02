import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="text-fire">Arts Fest</h3>
            <p>Experience the fire of creativity and talent!</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/results">Results</a></li>
              <li><a href="/gallery">Gallery</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@artsfest.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 College Arts Fest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;