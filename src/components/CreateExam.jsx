import React, { useState } from "react";
import styles from "./CreateExam.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreateExam = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    date: "",
    startTime: "",
    duration: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
  });

  const handleExamChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    if (field === "question" || field === "answer") {
      updatedQuestions[index][field] = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: "", options: ["", "", "", ""], answer: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/exams", formData);
      console.log("Submitted:", res.data);
      alert("Exam created successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Error creating exam");
    }
  };
  return (
    <div className={styles.createExam}>
      <h2>Create New Exam</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="question" name="subject" placeholder="Subject" required onChange={handleExamChange} />
        <input type="question" name="description" placeholder="Description" required onChange={handleExamChange} />
        <input type="date" name="date" required onChange={handleExamChange} />
        <input type="time" name="startTime" required onChange={handleExamChange} />
        <input type="number" name="duration" placeholder="Duration (minutes)" required onChange={handleExamChange} />

        <h3>Add Questions</h3>
        {formData.questions.map((q, idx) => (
          <div key={idx} className={styles.questionBlock}>
            <input
              type="question"
              placeholder={`Question ${idx + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
              required
            />
            {q.options.map((opt, optIdx) => (
              <input
                key={optIdx}
                type="question"
                placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                value={opt}
                onChange={(e) => handleQuestionChange(idx, optIdx, e.target.value)}
                required
              />
            ))}
            <input
              type="question"
              placeholder="Correct Answer (A/B/C/D)"
              value={q.answer}
              onChange={(e) => handleQuestionChange(idx, "answer", e.target.value.toUpperCase())}
              required
            />
          </div>
        ))}

        <button type="button" className={styles.addBtn} onClick={addQuestion}>+ Add Question</button>
        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
};

export default CreateExam;
