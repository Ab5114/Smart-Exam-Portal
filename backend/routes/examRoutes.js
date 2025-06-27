const express = require("express");
 const router = express.Router();
const Exam = require("../models/Exam");
 
 router.post("/", async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

 
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 
router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
router.put("/:id", async (req, res) => {
  try {
    const updated = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Exam not found" });
    res.json(updated);
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