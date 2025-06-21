import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Questions.module.css';

const Questions = () => {
   const location = useLocation();
  const { subject, topic, questions: initialQuestions } = location.state || {};

  const [questions, setQuestions] = useState(initialQuestions || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState({ question: '', options: [], answer: '' });

  const handleDelete = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedData({ ...questions[index] });
  };

  const handleSave = () => {
    const updated = [...questions];
    updated[editingIndex] = editedData;
    setQuestions(updated);
    setEditingIndex(null);
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
      <h2 className={styles.title}>{subject} - {topic}</h2>
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
                <button onClick={handleSave}>Save</button>
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
