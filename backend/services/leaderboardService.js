const Result = require('../models/Result');
const Team = require('../models/Team');

const calculateLeaderboard = async () => {
    try {
        // Point system (can be adjusted as needed)
        const INDIVIDUAL_POINTS = { 1: 5, 2: 3, 3: 1 };
        const GROUP_POINTS = { 1: 10, 2: 6, 3: 2 };

        // Reset all team points to 0
        await Team.updateMany({}, { points: 0, rank: null });

        const results = await Result.find({}).populate('eventId').populate('studentId');

        const teamPoints = {};

        for (const result of results) {
            if (result.eventId && result.studentId) {
                const teamName = result.studentId.team;
                const position = result.position;
                const isGroup = result.eventId.eventType === 'Group';

                const points = isGroup ? GROUP_POINTS[position] : INDIVIDUAL_POINTS[position];

                if (points) {
                    teamPoints[teamName] = (teamPoints[teamName] || 0) + points;
                }
            }
        }

        // Update teams with calculated points
        for (const [teamName, points] of Object.entries(teamPoints)) {
            await Team.findOneAndUpdate({ name: teamName }, { points }, { upsert: true, setDefaultsOnInsert: true });
        }

        // Rank teams by points
        const teams = await Team.find({}).sort({ points: -1 });
        let rank = 1;
        for (let i = 0; i < teams.length; i++) {
            if (i > 0 && teams[i].points < teams[i - 1].points) {
                rank = i + 1;
            }
            teams[i].rank = rank;
            await teams[i].save();
        }

        return await Team.find({}).sort({ rank: 1 });
    } catch (error) {
        console.error('Error calculating leaderboard:', error);
        throw error;
    }
};

module.exports = { calculateLeaderboard };
