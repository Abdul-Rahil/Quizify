const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Quizes: {
    quizid: {
      type: String,
      required: true
    },
    qstatus: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: 'Not Started'
    },
    qscore: {
      type: Number,
      default: null
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;