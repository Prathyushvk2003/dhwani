const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  position: {
    type: Number,
    required: true,
    enum: [1, 2, 3] // 1st, 2nd, 3rd
  }
}, {
  timestamps: true
});

// Ensure that each event can only have one 1st, 2nd, and 3rd place winner
resultSchema.index({ eventId: 1, position: 1 }, { unique: true });

module.exports = mongoose.model('Result', resultSchema);