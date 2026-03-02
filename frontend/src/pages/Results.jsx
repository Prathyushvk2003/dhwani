import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultCard from '../components/results/ResultCard';
import './Results.css';

const Results = () => {
  const [eventsWithResults, setEventsWithResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events with their results from backend API
    const fetchResults = async () => {
      try {
        const response = await axios.get('/api/results');
        setEventsWithResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div id="results" className="results-page">
      <div className="container">
        <h1 className="page-title">EVENT RESULTS</h1>
        {loading ? (
          <div className="loading">Loading results...</div>
        ) : (
          <div className="results-container">
            {eventsWithResults.length > 0 ? (
              eventsWithResults.map(({ event, results }) => (
                <ResultCard key={event._id} event={event} results={results} />
              ))
            ) : (
              <p>No results available yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;