import { useState, useEffect,useCallBack} from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import styles from './AttemptExam.module.css';

const AttemptExam = () => {
  const { state } = useLocation();
  const { exam } = state;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); 
  const navigate = useNavigate();

  
const handleSubmit = useCallBack(() => {
  navigate('/result', { state: { exam, answers } });
}, [navigate, exam, answers]);

  useEffect(() => {
   
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleSubmit]);

  

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
