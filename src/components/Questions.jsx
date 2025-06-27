import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './Questions.module.css';

import axios from 'axios';
const Questions = () => {
   const { id } = useParams();
   const location = useLocation();
  const { subject, description, questions: initialQuestions} = location.state || {};

  const [questions, setQuestions] = useState(initialQuestions || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState({ question: '', options: [], answer: '' });

  const handleDelete = async (index) => {
  const updatedQuestions = [...questions];
  updatedQuestions.splice(index, 1); // ✅ remove the question

  setQuestions(updatedQuestions); // ✅ update frontend immediately

  try {
    const updatedExam = {
      subject,
      description,
      questions: updatedQuestions, // ✅ send updated list
    };

    await axios.put(`http://localhost:5000/api/exams/${id}`, updatedExam); // ✅ update backend
    alert("Question deleted successfully!");
    setEditingIndex(null);
  } catch (error) {
    console.error(error);
    alert("Failed to update exam.");
  }
};


  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedData({ ...questions[index] });
  };

const handleSave = async () => {
  try {
    const updatedQuestions = [...questions];
    updatedQuestions[editingIndex] = editedData;
    setQuestions(updatedQuestions); 

    const updatedExam = {
      subject,
      description: description,
      questions: updatedQuestions,
    };

    await axios.put(`http://localhost:5000/api/exams/${id}`, updatedExam);
    alert('Exam replaced successfully!');
    setEditingIndex(null);
  } catch (error) {
    console.error(error);
    alert('Failed to replace exam.');
  }
};



  const handleChange = (e, field, optIndex = null) => {
    if (field === 'options') {
      const newOptions = [...editedData.options];
      newOptions[optIndex] = e.target.value;
      setEditedData({ ...editedData, options: newOptions });
    } else {
      setEditedData({ ...editedData, [field]: e.target.value });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{subject} - {description}</h2>
      <ul>
        {questions.length === 0 ? <p>No questions found.</p> : null}
        {questions.map((q, index) => (
          <li key={index} className={styles.question}>
            {editingIndex === index ? (
              <div className={styles.editBox}>
                <input
                  type="text" 
                  value={editedData.question}
                  onChange={(e) => handleChange(e, 'question')}
                />
                {editedData.options.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={opt}
                    onChange={(e) => handleChange(e, 'options', idx)}
                    placeholder={`Option ${idx + 1}`}
                  />
                ))}
                <input
                  type="text"
                  value={editedData.answer}
                  onChange={(e) => handleChange(e, 'answer')}
                  placeholder="Correct Answer"
                />
                <button onClick={handleSave}>Save All Changes</button>
              </div>
            ) : (
              <>
                <strong>Q{index + 1}: {q.question}</strong>
                <ul className={styles.options}>
                  {q.options.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
                <p className={styles.answer}>Answer: {q.answer}</p>
                <div className={styles.qactions}>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
