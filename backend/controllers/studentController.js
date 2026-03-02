const Student = require('../models/Student');
const Event = require('../models/Event');

// Get student by registration number
const getStudentByRegNumber = async (req, res) => {
  try {
    const { regNumber } = req.params;

    const student = await Student.findOne({ registrationNumber: regNumber.toUpperCase() })
      .populate('events', 'name date time venue');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register student for an event
const registerForEvent = async (req, res) => {
  try {
    const { regNumber } = req.params;
    const { eventId } = req.body;

    // Find student
    const student = await Student.findOne({ registrationNumber: regNumber.toUpperCase() });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if student is already registered for this event
    if (student.events.includes(eventId)) {
      return res.status(400).json({ message: 'Student already registered for this event' });
    }

    // Add event to student
    student.events.push(eventId);
    await student.save();

    res.status(200).json({ 
      success: true, 
      message: 'Successfully registered for event',
      student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student dashboard data
const getStudentDashboard = async (req, res) => {
  try {
    const { regNumber } = req.params;

    const student = await Student.findOne({ registrationNumber: regNumber.toUpperCase() })
      .populate('events', 'name date time venue');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Prepare events with additional status info
    const eventsWithStatus = student.events.map(event => {
      const isCompleted = new Date(event.date) < new Date();
      
      // Here you would typically fetch the result for this event
      // For now, returning a mock result based on date
      let result = null;
      if (isCompleted) {
        // Mock result logic - in a real app, you'd query the Result collection
        result = 'Participated'; // Default for completed events
      }

      return {
        ...event.toObject(),
        isCompleted,
        result
      };
    });

    res.status(200).json({
      student: {
        name: student.name,
        registrationNumber: student.registrationNumber,
        team: student.team
      },
      events: eventsWithStatus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudentByRegNumber,
  registerForEvent,
  getStudentDashboard
};