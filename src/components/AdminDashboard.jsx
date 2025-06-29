 import { useNavigate } from "react-router-dom";
 import { useEffect ,useState} from "react";
import axios from "axios"; 

import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();


const [examList, setExamList] = useState([]);
 

useEffect(() => {
  axios.get("http://localhost:5000/api/exams/admin")
    .then((res) => {
      setExamList(res.data); 
      console.log("fetched exam data ",res.data) ;
    })
    .catch((err) => {
      console.error("Failed to fetch exams:", err);
    });
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
          <div className={styles.examCard} key={exam._id}>
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
    navigate(`/questions/${exam._id}`, {
      state: {
        examId:exam._id,
        subject: exam.subject,
        description: exam.description,
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
