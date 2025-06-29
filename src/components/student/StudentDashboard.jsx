 import { useNavigate } from 'react-router-dom';
import styles from './StudentDashboard.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const navigate = useNavigate();

   const [examList,setExamList] = useState([]);

   useEffect(()=>{
     axios.get("http://localhost:5000/api/exams").then((res)=>{
    setExamList(res.data);
    console.log(res.data);
     }).catch((error)=>{
      console.error("Failed to Fetch exam in student",error);
     });
   },[])
  const now = new Date();

  return (
    <div className={styles.wrapper}>
      <h2>Available Exams</h2>
      {examList.map((exam, index) => {
       const start = new Date(`${exam.date} ${exam.startTime}`);

        const isAvailable = now >= start;

        return (
          <div key={index} className={styles.examCard}>
            <h3>{exam.subject}</h3>
            <p>{exam.description}</p>
            <p>{exam.date} at {exam.startTime}</p>
            <button
              disabled={!isAvailable}
              onClick={() => navigate(`/attempt/${exam._id}`, {
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
