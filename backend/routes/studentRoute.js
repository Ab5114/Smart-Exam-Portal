const express = require('express');
const router = express.Router();
const Exam =require("../models/Exam");

 router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find({}, { 'questions.answer': 0 }).lean();
    res.json(exams);
  } catch (err) {
    console.error('Error fetching student exams:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

 router.post('/evaluate', async (req, res) => {
  const { examId, answers } = req.body;

  try {
    const exam = await Exam.findById(examId).lean();
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    const correctAnswers = exam.questions.map(q => q.answer);
    let score = 0;

    for (let i = 0; i < correctAnswers.length; i++) {
      if (answers[i] && answers[i] === correctAnswers[i]) {
        score += 4; 
      }
    }

    const totalMarks = exam.questions.length * 4;

    res.json({ score, totalMarks });
  } catch (err) {
    console.error('Evaluation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
