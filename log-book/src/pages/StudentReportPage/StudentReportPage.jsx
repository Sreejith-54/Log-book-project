import StudentReportComponent from "../../components/StudentReportComponent.jsx";
import StudentReportCalender from '../../components/StudentReportCalender.jsx';
import React from 'react';
import { X } from 'lucide-react';
import './StudentReportPage.css';
import { useNavigate } from "react-router-dom";

const datas = [
  { courseID: 'CSE101', Subject: 'Data Structures', Attendence: 40, totalClasses: 40 },
  { courseID: 'CSE102', Subject: 'Algorithms', Attendence: 33, totalClasses: 42 },
  { courseID: 'CSE103', Subject: 'Operating Systems', Attendence: 20, totalClasses: 38 },
  { courseID: 'CSE104', Subject: 'Database Systems', Attendence: 28, totalClasses: 36 },
  { courseID: 'CSE105', Subject: 'Computer Networks', Attendence: 30, totalClasses: 40 },
];


const StudentReport = (props) => {
  const Navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [subject , setSubject] = React.useState('');
  React.useEffect(() => {
    setData(datas);
  }, []);
  return (
    <div className="StudentReportPage">
      <main>
        <div className='opt' style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#f0f0f0', margin: '30px 20px', padding: '40px 20px', borderRadius: '8px'}}>
          <div className='class-selection'>
            <label htmlFor='class' style={{fontSize: '2vh', fontWeight: '600', marginRight: '1vw'}}>Select Class: </label>
            <select id='class' name='class' style={{fontSize: '1.5vh', padding: '10px 5vw', }}>
              <option value='class1'>Select</option>
            </select>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <label htmlFor='subject' style={{fontSize: '2vh', fontWeight: '600', marginRight: '1vw'}}>Select Subject: </label>
            <select id='subject' name='subject' value={subject} style={{fontSize: '1.5vh', padding: '10px 0px', textAlign: 'center'}} onChange={(e)=>setSubject(e.target.value)}>
              <option value=''>Select</option>
              {data.map((sub,index)=>(
                <option key={index} value={sub.Subject}>{sub.Subject}</option>
              ))}
            </select>
            { subject &&
              <X style={{cursor: 'pointer', color: 'red', marginLeft: '10px', border: '1px solid red'}} onClick={() => setSubject('')}/>
            }
          </div>
          <div style={{display: 'flex', gap: '1vh',}}>
          <button style={{fontSize: '1.5vh', fontWeight: 'bold', padding: '1vh 2vh'}} onClick={() =>Navigate("/admin")}>Student Report</button>
          <button style={{fontSize: '1.5vh', fontWeight: 'bold', padding: '1vh 2vh'}} onClick={() =>Navigate("/admin/subject-report")}>Class Report</button>
          </div>
        </div>
        <div className='details' style={{ textAlign: 'left', fontWeight: 'bold', width: '97%',padding: '2%',height: '50%', margin: 'auto', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <p>Name : {props.StudentName}</p>
          <p>Roll No : {props.RollNo}</p>
        </div>
        <div className='cards' style={{ margin: '30px auto',width: '97%'}}>
          {!subject &&
            <div className='student-details' style={{ backgroundColor: '#f0f0f0', margin: '30px auto', borderRadius: '8px', textAlign: 'center',display:'flex',justifyContent:'center'}}>
            <table border={0} style={{width: '90%',borderCollapse: 'separate', borderSpacing: '3px 10px'}}>
              <thead>
              <tr style={{height: '7vh', fontSize: '2vh'}}>
                <th>CourseID</th>
                <th>Subject</th>
                <th>Attendance %</th>
              </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <StudentReportComponent
                    key={index}
                    courseID={item.courseID}
                    Subject={item.Subject}
                    Attendence={item.Attendence}
                    totalClasses={item.totalClasses}
                  />
                ))}
              </tbody>
            </table>
          </div>}
          { subject &&
          <div className="calendar" style={{margin: '30px auto',width: '100%',height: '100%', backgroundColor: '#f0f0f0', padding: '30px 20px', borderRadius: '8px', textAlign: 'center'}}><StudentReportCalender subject={subject}/></div>
        }
        </div>
      </main>
    </div>
  );
}

export default StudentReport;
