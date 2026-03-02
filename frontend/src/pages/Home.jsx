import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div id="home" className="home">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title text-glow">COLLEGE ARTS FESTIVAL</h1>
          <p className="hero-subtitle">Experience the fire of creativity and talent!</p>
          <div className="hero-buttons">
            <a href="#events" className="btn btn-primary fire-glow pulse">View Events</a>
            <a href="#gallery" className="btn btn-secondary">Photo Gallery</a>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="text-fire">Wanna See The Fire?</h2>
            <p>Relive the flames of our spectacular college arts festival. Witness incredible performances, artistic displays, and moments of pure magic.</p>
            <a href="#gallery" className="btn btn-primary fire-glow">Relive The Flames!</a>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card card fire-glow">
              <h3>Talent Showcase</h3>
              <p>Witness the best talents from all departments in various competitions.</p>
            </div>
            <div className="feature-card card fire-glow">
              <h3>Competitions</h3>
              <p>Exciting group and individual events to showcase your skills.</p>
            </div>
            <div className="feature-card card fire-glow">
              <h3>Results & Rankings</h3>
              <p>Check live results and see which team takes the crown.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;