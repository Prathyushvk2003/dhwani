import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminResults.css';

const AdminResults = () => {
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState({
    eventId: '',
    studentId: '',
    position: '1'
  });
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch events, students, and results simultaneously
      const [eventsRes, studentsRes, resultsRes] = await Promise.all([
        axios.get('/api/events'),
        axios.get('/api/students'),
        axios.get('/api/results')
      ]);
      
      setEvents(eventsRes.data);
      setStudents(studentsRes.data);
      setResults(resultsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setEventsLoading(false);
      setStudentsLoading(false);
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
      await axios.post('/api/results', formData);
      
      // Reset form and fetch updated results
      setFormData({
        eventId: '',
        studentId: '',
        position: '1'
      });
      fetchData();
    } catch (error) {
      console.error('Error adding result:', error);
    }
  };

  const handleDelete = async (resultId) => {
    if (window.confirm('Are you sure you want to delete this result? This will affect the leaderboard.')) {
      try {
        await axios.delete(`/api/results/${resultId}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting result:', error);
      }
    }
  };

  const getEventName = (eventId) => {
    const event = events.find(e => e._id === eventId);
    return event ? event.name : 'Unknown Event';
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s._id === studentId);
    return student ? `${student.name} (${student.registrationNumber})` : 'Unknown Student';
  };

  const getPositionName = (position) => {
    switch(position) {
      case 1:
        return '1st Place';
      case 2:
        return '2nd Place';
      case 3:
        return '3rd Place';
      default:
        return `${position}th Place`;
    }
  };

  return (
    <div className="admin-results">
      <h2 className="section-title">Add New Result</h2>
      <form onSubmit={handleSubmit} className="result-form card">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="eventId">Event *</label>
            {eventsLoading ? (
              <div className="loading-select">Loading events...</div>
            ) : (
              <select
                id="eventId"
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                required
              >
                <option value="">Select an event</option>
                {events.map(event => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="studentId">Student *</label>
            {studentsLoading ? (
              <div className="loading-select">Loading students...</div>
            ) : (
              <select
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              >
                <option value="">Select a student</option>
                {students.map(student => (
                  <option key={student._id} value={student._id}>
                    {student.name} ({student.registrationNumber})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="1">1st Place</option>
              <option value="2">2nd Place</option>
              <option value="3">3rd Place</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Add Result</button>
      </form>

      <h2 className="section-title">Current Results</h2>
      {loading ? (
        <div className="loading">Loading results...</div>
      ) : (
        <div className="results-list">
          {results.length > 0 ? (
            results.map(result => (
              <div key={result._id} className="result-item card">
                <div className="result-info">
                  <h3>{getPositionName(result.position)}</h3>
                  <p><strong>Event:</strong> {getEventName(result.eventId)}</p>
                  <p><strong>Student:</strong> {getStudentName(result.studentId)}</p>
                </div>
                <button 
                  onClick={() => handleDelete(result._id)} 
                  className="btn btn-secondary danger"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No results added yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminResults;