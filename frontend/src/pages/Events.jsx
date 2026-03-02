import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/events/EventCard';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from backend API
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterClick = () => {
    // Open Google Form in new tab
    window.open('https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform', '_blank');
  };

  return (
    <div id="events" className="events-page">
      <div className="container">
        <h1 className="page-title">EVENTS</h1>
        <div className="register-cta">
          <button onClick={handleRegisterClick} className="btn btn-primary fire-glow register-btn">
            Register Now
          </button>
          <p>Registration is done through Google Form only</p>
        </div>

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : (
          <div className="events-grid">
            {events.length > 0 ? (
              events.map(event => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p>No events available at the moment.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;