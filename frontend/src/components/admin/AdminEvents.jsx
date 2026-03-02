import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminEvents.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eventType: 'Individual',
    date: '',
    time: '',
    venue: '',
    maxParticipants: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        // Update existing event
        await axios.put(`/api/events/${editingEvent._id}`, formData);
        setEditingEvent(null);
      } else {
        // Create new event
        await axios.post('/api/events', formData);
      }
      
      // Reset form and fetch updated events
      setFormData({
        name: '',
        description: '',
        eventType: 'Individual',
        date: '',
        time: '',
        venue: '',
        maxParticipants: ''
      });
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      description: event.description || '',
      eventType: event.eventType,
      date: event.date.split('T')[0],
      time: event.time,
      venue: event.venue || '',
      maxParticipants: event.maxParticipants || ''
    });
    setEditingEvent(event);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/api/events/${eventId}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setFormData({
      name: '',
      description: '',
      eventType: 'Individual',
      date: '',
      time: '',
      venue: '',
      maxParticipants: ''
    });
  };

  return (
    <div className="admin-events">
      <h2 className="section-title">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
      <form onSubmit={handleSubmit} className="event-form card">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Event Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventType">Event Type *</label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              <option value="Group">Group</option>
              <option value="Individual">Individual</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxParticipants">Max Participants</label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingEvent ? 'Update Event' : 'Add Event'}
          </button>
          {editingEvent && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="section-title">Manage Events</h2>
      {loading ? (
        <div className="loading">Loading events...</div>
      ) : (
        <div className="events-list">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event._id} className="event-item card">
                <div className="event-header">
                  <h3>{event.name}</h3>
                  <div className="event-type-badge">{event.eventType}</div>
                </div>
                <p>{event.description || 'No description available.'}</p>
                <div className="event-details">
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Venue:</strong> {event.venue || 'TBD'}</p>
                  {event.maxParticipants && <p><strong>Max Participants:</strong> {event.maxParticipants}</p>}
                </div>
                <div className="event-actions">
                  <button onClick={() => handleEdit(event)} className="btn btn-secondary">Edit</button>
                  <button onClick={() => handleDelete(event._id)} className="btn btn-secondary danger">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;