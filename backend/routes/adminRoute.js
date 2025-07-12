// routes/adminRoute.js
const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
 
const { encrypt, decrypt } = require("../utils/encrypt.js"); 

 router.post("/", async (req, res) => {
  try {
    const encryptedQuestions = req.body.questions.map((q) => ({
      question: encrypt(q.question),
      options: q.options.map((opt) => encrypt(opt)),
      answer: encrypt(q.answer),
    }));

    const exam = new Exam({
      ...req.body,
      questions: encryptedQuestions,
    });

    await exam.save();
    res.status(201).json({ message: "Exam created with encrypted questions." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

 router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();

    const decryptedExams = exams.map((exam) => {
      const decryptedQuestions = exam.questions.map((q) => {
        let question = q.question;
        let options = q.options;
        let answer = q.answer;

        try {
          question = decrypt(q.question);
          options = q.options.map(decrypt);
          answer = decrypt(q.answer);
        } catch (e) {
          console.warn("Decryption failed for question:", q.question, e.message);
        }

        return { question, options, answer };
      });

      return {
        ...exam.toObject(),
        questions: decryptedQuestions,
      };
    });

    // console.log("Sending data to admin:", decryptedExams);
    res.json(decryptedExams);
  } catch (error) {
    console.error("Error in /api/exams/admin:", error.message);
    res.status(500).json({ error: error.message });
  }
});


 router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const decryptedQuestions = exam.questions.map((q) => ({
      question: decrypt(q.question),
      options: q.options.map(decrypt),
      answer: decrypt(q.answer),
    }));

    res.json({
      ...exam.toObject(),
      questions: decryptedQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 router.put("/:id", async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.body.questions) {
      updateData.questions = req.body.questions.map((q) => ({
        question: encrypt(q.question),
        options: q.options.map(encrypt),
        answer: encrypt(q.answer),
      }));
    }

    const updated = await Exam.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Exam not found" });
    res.json({ message: "Exam updated and encrypted", exam: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


 router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Exam.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Exam not found" });
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 
module.exports = router;
