import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1 className="text-glow">Arts Fest</h1>
          </Link>
          <nav className="nav">
            <ul className="nav-list">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#events" className="nav-link">Events</a></li>
              <li><a href="#results" className="nav-link">Results</a></li>
              <li><a href="#gallery" className="nav-link">Gallery</a></li>
              <li><a href="#brochure" className="nav-link">Brochure</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;