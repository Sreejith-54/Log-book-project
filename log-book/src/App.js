import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentListPage from "./pages/StudentListPage/StudentListPage";
import StudentReport from "./pages/StudentReportPage/StudentReportPage.jsx";
import FacultyDashboard from './pages/Faculty/FacultyDashboard';
import SubjectWiseReport from './pages/SubjectWiseReport/SubjectWiseReport';
import Cr from './components/Attendance.js';
import AttendanceReport from './pages/Faculty/AttendanceReport.jsx';
import MainLayout from './components/MainLayout';
import Login from './pages/Login/Login.jsx';

const candid = {
  id : 1,
  StudentName: "John Doe",
  RollNo: "AM.SC.U5CSE24654",
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cr" element={<MainLayout />}>
            <Route index element={<Cr />} />
          </Route>
          <Route path="/Faculty" element={<MainLayout />}>
            <Route index element={<FacultyDashboard />} /> 
            <Route path="attendance" element={<AttendanceReport />} />
          </Route>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<StudentListPage />} /> 
            <Route path="student-report" element={<StudentReport key={candid.id} StudentName={candid.StudentName} RollNo={candid.RollNo} />}/>
            <Route path="subject-report" element={<SubjectWiseReport />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
