import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./Result.module.css";

const Result = () => {
  const { state } = useLocation();
  const { score, totalMarks } = state; 
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/student");
  };

  return (
    <div>
      <div className={styles.header}>
        <h2>Exam Result</h2>
      </div>
      <h2>Result</h2>
      <p className={styles.score}>Score: {score} / {totalMarks}</p>
      <div className={styles.controls}>
        <button className={styles.nextBtn} onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default Result;
