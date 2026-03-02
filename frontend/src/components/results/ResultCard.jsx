import React from 'react';
import './ResultCard.css';

const ResultCard = ({ event, results }) => {
  // Sort results by position (1st, 2nd, 3rd)
  const sortedResults = [...results].sort((a, b) => a.position - b.position);

  const getPositionClass = (position) => {
    switch(position) {
      case 1:
        return 'result-place-1st';
      case 2:
        return 'result-place-2nd';
      case 3:
        return 'result-place-3rd';
      default:
        return 'result-place-other';
    }
  };

  const getPositionText = (position) => {
    switch(position) {
      case 1:
        return '1st Place';
      case 2:
        return '2nd Place';
      case 3:
        return '3rd Place';
      default:
        return 'Participant';
    }
  };

  return (
    <div className="result-card card fire-glow">
      <h3 className="result-event-name">{event.name}</h3>
      <div className="results-list">
        {sortedResults.length > 0 ? (
          sortedResults.map(result => (
            <div key={`${event._id}-${result.studentId}`} className={`result-item ${getPositionClass(result.position)}`}>
              <div className="result-position">{getPositionText(result.position)}</div>
              <div className="result-student">{result.studentName}</div>
              <div className="result-team">({result.team})</div>
            </div>
          ))
        ) : (
          <p>No results available for this event yet.</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;