 import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./Result.module.css";

const Result = () => {
  const { state } = useLocation();
  const { exam, answers } = state;
  const {subject,description}=exam;
     const navigate = useNavigate();

  const correct = exam.questions.reduce((acc, q, i) => (
    acc + (answers[i] === q.answer ? 1 : 0)
  ), 0);

  const handleBack=()=>{
    navigate("/student");
  }

  return (
    <div>
          <div className={styles.header}>
          <h2>{subject} - {description}</h2>
       </div>
      <h2>Result</h2>
     
      <p className={styles.score}>Score: {correct*4} / {exam.questions.length*4} </p>
      <div className={styles.controls}>
      <button className={styles.nextBtn} onClick={handleBack}> Back</button>
      </div>
    </div>
  );
};

export default Result;
