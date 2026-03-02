const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true,
    enum: ['BTECH1', 'BTECH2', 'BTECH3', 'BTECH4', 'MCA']
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);