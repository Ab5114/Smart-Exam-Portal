 import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const examList = [
    {
      id: 1,
      subject: "Mathematics",
      description: "Algebra and Geometry",
      date: "2025-06-20",
      startTime:"10:00",
      duration: 90,
    },
    {
      id: 2,
      subject: "Physics",
      description: "Mechanics and Thermo",
      date: "2025-06-22",
    startTime:"14:30",

      duration: 120,
    },
      {
      id: 1,
      subject: "Mathematics",
      description: "Algebra and Geometry",
      date: "2025-06-20",
      startTime:"10:00",
      duration: 90,
    },  {
      id: 1,
      subject: "Mathematics",
      description: "Algebra and Geometry",
      date: "2025-06-20",
      startTime:"10:00",
      duration: 90,
    },  {
      id: 1,
      subject: "Mathematics",
      description: "Algebra and Geometry",
      date: "2025-06-20",
      startTime:"10:00",
      duration: 90,
    }, 
  ];

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
              <button>View Questions</button>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
