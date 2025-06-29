const express = require("express");
 const router = express.Router();
const Exam = require("../models/Exam");
 
 
router.post("/", async (req, res) => {
  const { examId, answers } = req.body;
  try {
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    const correct = exam.questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.answer ? 1 : 0);
    }, 0);

    const totalMarks = exam.questions.length * 4;
    const score = correct * 4;

    return res.json({ score, totalMarks });
  } catch (err) {
    console.error("Evaluation error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
