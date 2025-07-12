//models/ Result.js
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  answers: {
    type: [String],  
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudentResult", resultSchema);
