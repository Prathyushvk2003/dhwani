import React from 'react';
import './TeamCard.css';

const TeamCard = ({ team, rank }) => {
  // Determine the rank style based on position
  const getRankStyle = () => {
    if (rank === 1) return 'first-place';
    if (rank === 2) return 'second-place';
    if (rank === 3) return 'third-place';
    return 'other-place';
  };

  // Get the medal emoji based on rank
  const getMedal = () => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className={`team-card card fire-glow ${getRankStyle()}`}>
      <div className="team-rank">{getMedal()}</div>
      <div className="team-info">
        <h3 className="team-name">{team.name.replace(/([A-Z])/g, ' $1').trim()}</h3>
        <p className="team-points">{team.points} Points</p>
      </div>
      <div className="team-rank-number">#{rank}</div>
    </div>
  );
};

export default TeamCard;