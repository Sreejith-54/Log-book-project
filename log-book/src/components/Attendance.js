import React, { useState } from 'react';
import './Attendance.css';

export default function Attendance() {
  const [klass, setKlass] = useState('CSE-A');
  const [facultyCode, setFacultyCode] = useState('');

  // ✅ status instead of present
  const [students, setStudents] = useState([
    { id: 1, roll: '01', name: 'AM.SC.U4CSE24208', status: 'present' },
    { id: 2, roll: '02', name: 'AM.SC.U4CSE24209', status: 'present' },
    { id: 3, roll: '03', name: 'AM.SC.U4CSE24210', status: 'present' },
    { id: 4, roll: '04', name: 'AM.SC.U4CSE24211', status: 'present' },
    { id: 5, roll: '05', name: 'AM.SC.U4CSE24212', status: 'present' },
  ]);

  // ✅ Cycle status
  function toggleAttendance(id) {
    setStudents((prev) =>
      prev.map((st) => {
        if (st.id !== id) return st;

        const nextStatus =
          st.status === 'present'
            ? 'late'
            : st.status === 'late'
            ? 'absent'
            : 'present';

        return { ...st, status: nextStatus };
      })
    );
  }

  // ✅ Filters
  const absentees = students.filter((s) => s.status === 'absent');
  const lateComers = students.filter((s) => s.status === 'late');

  function handleSubmit() {
    console.log('Faculty Code:', facultyCode);
    console.log('Class:', klass);
    console.log('Late Comers:', lateComers);
    console.log('Absentees:', absentees);
    alert('Attendance Submitted!');
  }

  return (
    <div className="attendance-page">
      <div className="topbar">Logbook</div>

      <div className="attendance-wrapper">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="title">TIMETABLE</div>

          <div className="table-wrapper">
            <table className="stu-table">
              <thead>
                <tr>
                  <th>Roll</th>
                  <th>Student Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st) => (
                  <tr
                    key={st.id}
                    className={`row ${st.status}`}
                    onClick={() => toggleAttendance(st.id)}
                    title="Click to change status"
                  >
                    <td>{st.roll}</td>
                    <td>{st.name}</td>
                    <td>
                      {st.status === 'present' && '✔ Present'}
                      {st.status === 'late' && ' Late'}
                      {st.status === 'absent' && '✖ Absent'}
                    </td>
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
            Select Class
            <select value={klass} onChange={(e) => setKlass(e.target.value)}>
              <option>CSE-A</option>
              <option>CSE-B</option>
              <option>ECE-A</option>
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
