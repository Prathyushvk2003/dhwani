import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card card fire-glow">
      <h3 className="event-title">{event.name}</h3>
      <p className="event-description">{event.description || 'No description available.'}</p>
      <div className="event-details">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Venue:</strong> {event.venue || 'TBD'}</p>
        <p><strong>Type:</strong> {event.eventType}</p>
      </div>
      <div className="event-status">
        {event.isActive ? (
          <span className="status-badge status-upcoming">Active</span>
        ) : (
          <span className="status-badge status-completed">Completed</span>
        )}
      </div>
    </div>
  );
};

export default EventCard;