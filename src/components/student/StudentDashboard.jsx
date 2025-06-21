 import { useNavigate } from 'react-router-dom';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  const navigate = useNavigate();

   const examList = JSON.parse(localStorage.getItem('exams')) || [];

  const now = new Date();

  return (
    <div className={styles.wrapper}>
      <h2>Available Exams</h2>
      {examList.map((exam, index) => {
        const start = new Date(`${exam.date}T${exam.startTime}`);
        const isAvailable = now >= start;

        return (
          <div key={index} className={styles.examCard}>
            <h3>{exam.subject}</h3>
            <p>{exam.description}</p>
            <p>{exam.date} at {exam.startTime}</p>
            <button
              disabled={!isAvailable}
              onClick={() => navigate(`/attempt/${exam.id}`, {
                state: { exam }
              })}
            >
              {isAvailable ? 'Start Exam' : 'Not Started Yet'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default StudentDashboard;
