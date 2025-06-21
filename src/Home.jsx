 import pic1 from './images/1.png';
import pic2 from './images/2.png';
import pic3 from './images/3.jpg';
import styles from './Home.module.css';  
import { useNavigate } from "react-router-dom";

const Home = () => {
      const navigate = useNavigate();

  return (
    <><div className={styles.parent}>
      <div className={styles.banner}>
        <h2>Welcome to the Exam Portal</h2>
      </div>

      <div className={styles.container}>
         <div className={styles.logocontainer}>
          <div className={styles.logo}>
            <img src={pic1} alt="logo" />
            <h3>Smart Exam Portal</h3>
          </div>
        </div>
        <div className={styles.role}>
            
          <div className={styles.student} onClick={()=>navigate("/student")}>
            <img src={pic2} alt="student" />
            <h3>Student</h3>
          </div>
          <div className={styles.admin} onClick={() => navigate("/admin-dashboard")}>
            <img src={pic3} alt="admin" />
            <h3>Admin</h3>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
