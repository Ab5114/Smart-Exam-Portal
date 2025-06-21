 import { useNavigate } from "react-router-dom";
 import { useEffect } from "react";

import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

const examList = [
  {
    id: 1,
    subject: "Mathematics",
    description: "Algebra and Geometry",
    date: "2025-06-20",
    startTime: "10:00",
    duration: 90,
    questions: [
      {
        question: "What is 2 + 2?",
        options: ["1", "2", "3", "4"],
        answer: "4",
      },
      {
        question: "What is the square root of 16?",
        options: ["2", "4", "8", "16"],
        answer: "4",
      },
    ],
  },
  {
    id: 2,
    subject: "Physics",
    description: "Mechanics and Thermodynamics",
    date: "2025-06-22",
    startTime: "14:30",
    duration: 120,
    questions: [
      {
        question: "What is Newton's Second Law?",
        options: ["F = ma", "E = mc^2", "F = mg", "v = u + at"],
        answer: "F = ma",
      },
    ],
  },
];

  useEffect(() => {
    localStorage.setItem("exams", JSON.stringify(examList));
  }, []);

   return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>
      <h2>Exam Lists</h2>
<div className={styles.createBtnContainer} onClick={() => navigate("/create-exam")}>
  <button className={styles.createBtn}>+ Create Exam</button>
</div>
      
      <div className={styles.examList}>
        {examList.map((exam) => (
          <div className={styles.examCard} key={exam.id}>
            <h3>{exam.subject}</h3>
            <p>
  <span style={{ fontWeight: 'bold' }}>Topic -</span> {exam.description}
</p>
 
            <p>Date: {exam.date}</p>
            <p>Duration: {exam.duration} minutes</p>
            <p>Start Time : {exam.startTime}</p>
            <div className={styles.actions}>
             <button
  onClick={() =>
    navigate(`/questions/${exam.id}`, {
      state: {
        subject: exam.subject,
        topic: exam.description,
        questions: exam.questions,
      },
    })
  }
>
  View Questions
</button>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
