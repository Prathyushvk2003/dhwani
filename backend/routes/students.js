const express = require('express');
const { 
  getStudentByRegNumber, 
  registerForEvent, 
  getStudentDashboard 
} = require('../controllers/studentController');

const router = express.Router();

router.route('/:regNumber').get(getStudentByRegNumber);
router.route('/:regNumber/events').put(registerForEvent);
router.route('/:regNumber/dashboard').get(getStudentDashboard);

module.exports = router;