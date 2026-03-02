const express = require('express');
const { studentLogin, adminLogin } = require('../controllers/authController');

const router = express.Router();

router.route('/student/login').post(studentLogin);
router.route('/admin/login').post(adminLogin);

module.exports = router;