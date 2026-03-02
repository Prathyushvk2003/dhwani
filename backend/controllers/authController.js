const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

// Student login
const studentLogin = async (req, res) => {
  try {
    const { regNumber } = req.body;

    // Find student by registration number (case insensitive)
    const student = await Student.findOne({ 
      registrationNumber: regNumber.toUpperCase() 
    });

    if (!student) {
      return res.status(401).json({ 
        message: 'Invalid registration number' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, registrationNumber: student.registrationNumber },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      token,
      student: {
        id: student._id,
        name: student.name,
        registrationNumber: student.registrationNumber,
        team: student.team
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  studentLogin,
  adminLogin
};