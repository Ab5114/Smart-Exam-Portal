 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminDashboard from "./components/AdminDashboard";
import CreateExam from "./components/CreateExam";
import Questions from "./components/Questions";
import StudentDashboard from "./components/student/StudentDashboard";
import AttemptExam from "./components/student/AttemptExam";
import Result from "./components/student/Result";
 function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/questions/:id" element={<Questions />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/attempt/:id" element={<AttemptExam />} />
        <Route path="/result" element={<Result />} />


       </Routes>
    </Router>
  );
}

export default App;
