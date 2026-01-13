import React, { useState } from 'react';
import './Attendance.css';

export default function Attendance() {
  const [klass, setKlass] = useState('CSE-A');
  const [facultyCode, setFacultyCode] = useState('');

  // ✅ status instead of present
  const [students, setStudents] = useState([
  { id: 1, roll: '01', name: 'AM.SC.U4CSE24201', status: 'present' },
  { id: 2, roll: '02', name: 'AM.SC.U4CSE24202', status: 'present' },
  { id: 3, roll: '03', name: 'AM.SC.U4CSE24203', status: 'present' },
  { id: 4, roll: '04', name: 'AM.SC.U4CSE24204', status: 'present' },
  { id: 5, roll: '05', name: 'AM.SC.U4CSE24205', status: 'present' },
  { id: 6, roll: '06', name: 'AM.SC.U4CSE24206', status: 'present' },
  { id: 7, roll: '07', name: 'AM.SC.U4CSE24207', status: 'present' },
  { id: 8, roll: '08', name: 'AM.SC.U4CSE24208', status: 'present' },
  { id: 9, roll: '09', name: 'AM.SC.U4CSE24209', status: 'present' },
  { id: 10, roll: '10', name: 'AM.SC.U4CSE24210', status: 'present' },

  { id: 11, roll: '11', name: 'AM.SC.U4CSE24211', status: 'present' },
  { id: 12, roll: '12', name: 'AM.SC.U4CSE24212', status: 'present' },
  { id: 13, roll: '13', name: 'AM.SC.U4CSE24213', status: 'present' },
  { id: 14, roll: '14', name: 'AM.SC.U4CSE24214', status: 'present' },
  { id: 15, roll: '15', name: 'AM.SC.U4CSE24215', status: 'present' },
  { id: 16, roll: '16', name: 'AM.SC.U4CSE24216', status: 'present' },
  { id: 17, roll: '17', name: 'AM.SC.U4CSE24217', status: 'present' },
  { id: 18, roll: '18', name: 'AM.SC.U4CSE24218', status: 'present' },
  { id: 19, roll: '19', name: 'AM.SC.U4CSE24219', status: 'present' },
  { id: 20, roll: '20', name: 'AM.SC.U4CSE24220', status: 'present' },

  { id: 21, roll: '21', name: 'AM.SC.U4CSE24221', status: 'present' },
  { id: 22, roll: '22', name: 'AM.SC.U4CSE24222', status: 'present' },
  { id: 23, roll: '23', name: 'AM.SC.U4CSE24223', status: 'present' },
  { id: 24, roll: '24', name: 'AM.SC.U4CSE24224', status: 'present' },
  { id: 25, roll: '25', name: 'AM.SC.U4CSE24225', status: 'present' },
  { id: 26, roll: '26', name: 'AM.SC.U4CSE24226', status: 'present' },
  { id: 27, roll: '27', name: 'AM.SC.U4CSE24227', status: 'present' },
  { id: 28, roll: '28', name: 'AM.SC.U4CSE24228', status: 'present' },
  { id: 29, roll: '29', name: 'AM.SC.U4CSE24229', status: 'present' },
  { id: 30, roll: '30', name: 'AM.SC.U4CSE24230', status: 'present' },

  { id: 31, roll: '31', name: 'AM.SC.U4CSE24231', status: 'present' },
  { id: 32, roll: '32', name: 'AM.SC.U4CSE24232', status: 'present' },
  { id: 33, roll: '33', name: 'AM.SC.U4CSE24233', status: 'present' },
  { id: 34, roll: '34', name: 'AM.SC.U4CSE24234', status: 'present' },
  { id: 35, roll: '35', name: 'AM.SC.U4CSE24235', status: 'present' },
  { id: 36, roll: '36', name: 'AM.SC.U4CSE24236', status: 'present' },
  { id: 37, roll: '37', name: 'AM.SC.U4CSE24237', status: 'present' },
  { id: 38, roll: '38', name: 'AM.SC.U4CSE24238', status: 'present' },
  { id: 39, roll: '39', name: 'AM.SC.U4CSE24239', status: 'present' },
  { id: 40, roll: '40', name: 'AM.SC.U4CSE24240', status: 'present' },

  { id: 41, roll: '41', name: 'AM.SC.U4CSE24241', status: 'present' },
  { id: 42, roll: '42', name: 'AM.SC.U4CSE24242', status: 'present' },
  { id: 43, roll: '43', name: 'AM.SC.U4CSE24243', status: 'present' },
  { id: 44, roll: '44', name: 'AM.SC.U4CSE24244', status: 'present' },
  { id: 45, roll: '45', name: 'AM.SC.U4CSE24245', status: 'present' },
  { id: 46, roll: '46', name: 'AM.SC.U4CSE24246', status: 'present' },
  { id: 47, roll: '47', name: 'AM.SC.U4CSE24247', status: 'present' },
  { id: 48, roll: '48', name: 'AM.SC.U4CSE24248', status: 'present' },
  { id: 49, roll: '49', name: 'AM.SC.U4CSE24249', status: 'present' },
  { id: 50, roll: '50', name: 'AM.SC.U4CSE24250', status: 'present' },

  { id: 51, roll: '51', name: 'AM.SC.U4CSE24251', status: 'present' },
  { id: 52, roll: '52', name: 'AM.SC.U4CSE24252', status: 'present' },
  { id: 53, roll: '53', name: 'AM.SC.U4CSE24253', status: 'present' },
  { id: 54, roll: '54', name: 'AM.SC.U4CSE24254', status: 'present' },
  { id: 55, roll: '55', name: 'AM.SC.U4CSE24255', status: 'present' },
  { id: 56, roll: '56', name: 'AM.SC.U4CSE24256', status: 'present' },
  { id: 57, roll: '57', name: 'AM.SC.U4CSE24257', status: 'present' },
  { id: 58, roll: '58', name: 'AM.SC.U4CSE24258', status: 'present' },
  { id: 59, roll: '59', name: 'AM.SC.U4CSE24259', status: 'present' },
  { id: 60, roll: '60', name: 'AM.SC.U4CSE24260', status: 'present' }
  ]);

  // ✅ Cycle status
  function toggleAttendance(id) {
    setStudents((prev) =>
      prev.map((st) => {
        if (st.id !== id) return st;

        const nextStatus =
          st.status === 'present'
            ? 'absent'
            : st.status === 'absent'
            ? 'late'
            : 'present';

        return { ...st, status: nextStatus };
      })
    );
  }
  const [timetable, setTimeTable] = useState('Show')

  // ✅ Filters
  const absentees = students.filter((s) => s.status === 'absent');
  const lateComers = students.filter((s) => s.status === 'late');
  function handletable(){
    timetable === 'Show'
    ? setTimeTable('Hide')
    : setTimeTable('Show');
  }
  function handleSubmit() {
    console.log('Faculty Code:', facultyCode);
    console.log('Class:', klass);
    console.log('Late Comers:', lateComers);
    console.log('Absentees:', absentees);
    alert('Attendance Submitted!');
  }

  return (
    <div className="attendance-page">
      <div className="attendance-wrapper">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div>
            <button onClick={()=>handletable()} style={{ backgroundColor: '#AD3A3C',color: 'white', padding: '10px',marginBottom:'10px'}}>{`${timetable} Time Table`}</button>
          </div>
          {timetable === 'Hide' &&
            <div className='title'>Time Table</div>}
          <div className="table-wrapper">
            <table className="stu-table">
              <div className='icon' style={{display:'flex', gap:'10px'}}>
                <div className='present'>Present</div>
                <div className='absent'>Absent</div>
                <div className='late'>Late</div>
              </div>
              <tbody className='grid'>
                {students.map((st) => (
                  <tr
                    style={{minWidth:'70px'}}
                    key={st.id}
                    className={`row ${st.status}`}
                    onClick={() => toggleAttendance(st.id)}
                    title="Click to change status"
                  >
                    <td><span className='roll-class'>{st.name.slice(-8,-3)}</span><br/><span style={{fontWeight:'700' , fontSize: 'xx-large',}}>{st.name.slice(-3)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <label className="label">
            Faculty Code
            <input
              type="text"
              placeholder="Enter faculty code"
              value={facultyCode}
              onChange={(e) => setFacultyCode(e.target.value)}
              className="input"
            />
          </label>

          <label className="label">
            Select Subject
            <select value={klass} onChange={(e) => setKlass(e.target.value)}>
              <option>Python</option>
              <option>Math</option>
              <option>Data Structure and Algorithm</option>
            </select>
          </label>

          {/* LATE COMERS */}
          <div className="late-box">
            <h4>Late Comers</h4>
            {lateComers.length === 0 ? (
              <p className="none">None</p>
            ) : (
              lateComers.map((s) => (
                <div key={s.id} className="late-name">
                  {s.name.slice(-3)}
                </div>
              ))
            )}
          </div>

          {/* ABSENTEES */}
          <div className="absentees">
            <h4>Absentees</h4>
            {absentees.length === 0 ? (
              <p className="none">None</p>
            ) : (
              absentees.map((s) => (
                <div key={s.id} className="absent-name">
                  {s.name.slice(-3)}
                </div>
              ))
            )}
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
