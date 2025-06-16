import React, { useState } from "react";
import styles from "./CreateExam.module.css";
import { useNavigate } from "react-router-dom";

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
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ],
  });

  const handleExamChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    if (field === "text" || field === "correctAnswer") {
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
        { text: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Exam Data:", formData);
    alert("Exam with questions created!");
    navigate("/admin-dashboard");
  };

  return (
    <div className={styles.createExam}>
      <h2>Create New Exam</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="subject" placeholder="Subject" required onChange={handleExamChange} />
        <input type="text" name="description" placeholder="Description" required onChange={handleExamChange} />
        <input type="date" name="date" required onChange={handleExamChange} />
        <input type="time" name="startTime" required onChange={handleExamChange} />
        <input type="number" name="duration" placeholder="Duration (minutes)" required onChange={handleExamChange} />

        <h3>Add Questions</h3>
        {formData.questions.map((q, idx) => (
          <div key={idx} className={styles.questionBlock}>
            <input
              type="text"
              placeholder={`Question ${idx + 1}`}
              value={q.text}
              onChange={(e) => handleQuestionChange(idx, "text", e.target.value)}
              required
            />
            {q.options.map((opt, optIdx) => (
              <input
                key={optIdx}
                type="text"
                placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                value={opt}
                onChange={(e) => handleQuestionChange(idx, optIdx, e.target.value)}
                required
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer (A/B/C/D)"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(idx, "correctAnswer", e.target.value.toUpperCase())}
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
