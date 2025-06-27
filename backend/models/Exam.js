const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const examSchema = new mongoose.Schema({
  subject: String,
  description: String,
  date: String,
  startTime: String,
  duration: Number,
  questions: [questionSchema],
});

module.exports = mongoose.model('Exam', examSchema);
