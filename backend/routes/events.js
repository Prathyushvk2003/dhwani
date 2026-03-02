const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/eventController');

const router = express.Router();

// Public routes
router.route('/').get(getAllEvents);
router.route('/:id').get(getEventById);

// Admin routes
router.route('/').post(protect, createEvent);
router.route('/:id').put(protect, updateEvent);
router.route('/:id').delete(protect, deleteEvent);

module.exports = router;