import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard';
import './LeaderboardPage.css';

const LeaderboardPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('/api/admin/leaderboard');
      setTeams(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  };

  return (
    <div className="leaderboard-page">
      <div className="container">
        <h1 className="page-title">TEAM LEADERBOARD</h1>
        {loading ? (
          <div className="loading">Calculating leaderboard...</div>
        ) : (
          <div className="leaderboard-container">
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <TeamCard 
                  key={team._id} 
                  team={team} 
                  rank={index + 1} 
                />
              ))
            ) : (
              <p>No teams in the leaderboard yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;