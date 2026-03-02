import React from 'react';
import './Brochure.css';

const Brochure = () => {
  const handlePreview = () => {
    // In a real app, this would open the PDF in a new tab
    window.open('/brochure.pdf', '_blank');
  };

  const handleDownload = () => {
    // In a real app, this would trigger the PDF download
    window.open('/brochure.pdf', '_blank'); // For demo purposes
  };

  // Sample events data
  const events = [
    { id: 1, name: 'Dance Competition', date: '2026-03-15', time: '18:00', venue: 'Main Auditorium' },
    { id: 2, name: 'Music Festival', date: '2026-03-16', time: '19:00', venue: 'Open Ground' },
    { id: 3, name: 'Art Exhibition', date: '2026-03-17', time: '10:00', venue: 'Arts Building' },
    { id: 4, name: 'Drama Performance', date: '2026-03-18', time: '18:30', venue: 'Mini Theatre' },
    { id: 5, name: 'Fashion Show', date: '2026-03-19', time: '17:00', venue: 'Main Ground' },
  ];

  return (
    <div id="brochure" className="brochure-page">
      <div className="container">
        <h1 className="page-title">FEST BROCHURE</h1>

        <div className="brochure-actions">
          <button onClick={handlePreview} className="btn btn-primary fire-glow">Preview Brochure</button>
          <button onClick={handleDownload} className="btn btn-secondary">Download Brochure</button>
        </div>

        <div className="events-list">
          <h2 className="section-title">Featured Events</h2>
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card card">
                <h3>{event.name}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="brochure-info">
          <h2 className="section-title">About the Fest</h2>
          <p>
            Welcome to our annual College Arts Festival, a celebration of creativity, talent, and artistic expression.
            This year's theme is "Fire & Passion" representing the burning desire of our students to showcase their
            incredible talents in various art forms.
          </p>
          <p>
            Join us for a week-long celebration filled with music, dance, drama, art exhibitions, and much more.
            Come witness the fire of creativity burn bright as our students bring their artistic visions to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brochure;