import { useEffect, useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import styles from './AttemptExam.module.css';
import axios from 'axios';
 
const AttemptExam = () => {
  const { state } = useLocation();
  const { exam } = state;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); 
  const navigate = useNavigate();

   useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer); // cleanup
}, [timeLeft]);


const handleSubmit = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/exams/evaluate", {
      examId: exam._id,
      answers: answers
    });

    const { score, totalMarks } = res.data;
    navigate("/result", { state: { score, totalMarks } });
  } catch (error) {
    console.error("Submission failed:", error);
    alert("Failed to submit exam. Please try again.");
  }
};


  

  const handleSelect = (opt) => {
    const updated = [...answers];
    updated[current] = opt;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (current < exam.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev=()=>{
     setCurrent(current-1);
  }
 
  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const question = exam.questions[current];

  return (
     <>
     <div className={styles.header}>
          <h2>{exam.subject} - {exam.description}</h2>
          <div className={styles.timer}>⏳ Time Left: {formatTime(timeLeft)}</div>
      </div>
      <div className={styles.examContainer}>


              <div className={styles.questionBox}>
                  <h3>Q{current + 1}: {question.question}</h3>
                  <ul className={styles.options}>
                      {question.options.map((opt, idx) => (
                          <li key={idx}>
                              <label className={answers[current] === opt ? styles.selected : ''}>
                                  <input
                                      type="radio"
                                      name={`q${current}`}
                                      value={opt}
                                      onChange={() => handleSelect(opt)}
                                      checked={answers[current] === opt} />
                                  {opt}
                              </label>
                          </li>
                      ))}
                  </ul>
              </div>

              <div className={styles.controls}>
                <button className={styles.nextBtn} onClick={handlePrev} disabled={current===0}> Back</button>
                   <button className={styles.nextBtn} onClick={handleNext}>
                      {current < exam.questions.length - 1 ? 'Next' : 'Submit'}
                  </button>
              </div>
          </div></>
  );
};

export default AttemptExam;
