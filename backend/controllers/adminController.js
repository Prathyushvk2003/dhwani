const Student = require('../models/Student');
const Event = require('../models/Event');
const Result = require('../models/Result');
const Team = require('../models/Team');
const { calculateLeaderboard } = require('../services/leaderboardService');

// Get admin dashboard stats
const getStats = async (req, res) => {
  try {
    const [totalStudents, totalEvents, totalResults, totalTeams] = await Promise.all([
      Student.countDocuments(),
      Event.countDocuments(),
      Result.countDocuments(),
      Team.countDocuments()
    ]);

    res.status(200).json({
      totalStudents,
      totalEvents,
      totalResults,
      totalTeams
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).sort({ registrationNumber: 1 });
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create student
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    // Calculate and return the leaderboard
    const leaderboard = await calculateLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStats,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getLeaderboard
};