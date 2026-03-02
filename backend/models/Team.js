const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['BTECH1', 'BTECH2', 'BTECH3', 'BTECH4', 'MCA']
  },
  points: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);