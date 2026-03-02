const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getStats,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getLeaderboard
} = require('../controllers/adminController');

const router = express.Router();

// Admin routes
router.route('/stats').get(protect, getStats);
router.route('/students').get(protect, getAllStudents);
router.route('/students').post(protect, createStudent);
router.route('/students/:id').put(protect, updateStudent);
router.route('/students/:id').delete(protect, deleteStudent);
router.route('/leaderboard').get(protect, getLeaderboard);

module.exports = router;