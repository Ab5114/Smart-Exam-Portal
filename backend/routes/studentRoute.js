const express = require('express');
const router = express.Router();
const Exam = require("../models/Exam");
const StudentResult = require("../models/Result"); 
const { decrypt } = require("../utils/encrypt.js");

router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find({}, { 'questions.answer': 0 }).lean();

    console.log("Fetched exams for student:", exams.length);

    const decryptedExams = exams.map(exam => ({
      ...exam,
      questions: exam.questions.map(q => {
        let question = q.question;
        let options = q.options;

        try {
          question = decrypt(q.question);
          options = q.options.map(opt => decrypt(opt));
        } catch (e) {
          console.warn("Decryption failed for student exam question:", q, e.message);
        }

        return { question, options };
      })
    }));
  console.log("called ",decryptedExams);
    res.json(decryptedExams);
  } catch (err) {
    console.error('Error fetching student exams:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


 router.post('/evaluate', async (req, res) => {
  const { examId, answers, studentId } = req.body;

  try {
    const exam = await Exam.findById(examId).lean();
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    const correctAnswers = exam.questions.map(q => decrypt(q.answer));
    let score = 0;

    for (let i = 0; i < correctAnswers.length; i++) {
      if (answers[i] && answers[i] === correctAnswers[i]) {
        score += 4;
      }
    }

    const totalMarks = exam.questions.length * 4;

     const result = new StudentResult({
      studentId,
      examId,
      answers,
      score,
      totalMarks,
      submittedAt: new Date()
    });

    await result.save();

    res.json({ score, totalMarks });
  } catch (err) {
    console.error('Evaluation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
