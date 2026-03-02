const Result = require('../models/Result');
const Event = require('../models/Event');
const Student = require('../models/Student');
const { calculateLeaderboard } = require('../services/leaderboardService');

// Get all results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find({})
      .populate('eventId', 'name')
      .populate('studentId', 'name registrationNumber team');
    
    // Group results by event
    const groupedResults = {};
    results.forEach(result => {
      const eventId = result.eventId._id.toString();
      if (!groupedResults[eventId]) {
        groupedResults[eventId] = {
          event: result.eventId,
          results: []
        };
      }
      groupedResults[eventId].results.push({
        ...result.toObject(),
        studentName: result.studentId.name,
        registrationNumber: result.studentId.registrationNumber,
        team: result.studentId.team
      });
    });
    
    // Convert to array format
    const resultArray = Object.values(groupedResults);
    
    res.status(200).json(resultArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get results by event
const getResultsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const results = await Result.find({ eventId })
      .populate('studentId', 'name registrationNumber team')
      .sort({ position: 1 }); // Sort by position (1st, 2nd, 3rd)
    
    const resultsWithStudentInfo = results.map(result => ({
      ...result.toObject(),
      studentName: result.studentId.name,
      registrationNumber: result.studentId.registrationNumber,
      team: result.studentId.team
    }));
    
    res.status(200).json(resultsWithStudentInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add result
const addResult = async (req, res) => {
  try {
    const { eventId, studentId, position } = req.body;
    
    // Check if this event already has a result for this position
    const existingResult = await Result.findOne({ eventId, position });
    if (existingResult) {
      return res.status(400).json({ 
        message: `Event already has a ${position} place winner` 
      });
    }
    
    // Create new result
    const result = new Result({
      eventId,
      studentId,
      position
    });
    
    await result.save();
    
    // Populate the result with student info for response
    await result.populate('studentId', 'name registrationNumber team');
    await result.populate('eventId', 'name');
    
    // Recalculate leaderboard
    await calculateLeaderboard();
    
    res.status(201).json({
      ...result.toObject(),
      studentName: result.studentId.name,
      registrationNumber: result.studentId.registrationNumber,
      team: result.studentId.team
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update result
const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventId, studentId, position } = req.body;
    
    // Check if another result exists for the same event and position
    const existingResult = await Result.findOne({ 
      eventId, 
      position,
      _id: { $ne: id } // Exclude the current result
    });
    
    if (existingResult) {
      return res.status(400).json({ 
        message: `Event already has a ${position} place winner` 
      });
    }
    
    const result = await Result.findByIdAndUpdate(
      id, 
      { eventId, studentId, position }, 
      { new: true, runValidators: true }
    ).populate('studentId', 'name registrationNumber team');
    
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    
    // Recalculate leaderboard
    await calculateLeaderboard();
    
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete result
const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Result.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    
    // Recalculate leaderboard
    await calculateLeaderboard();
    
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllResults,
  getResultsByEvent,
  addResult,
  updateResult,
  deleteResult
};