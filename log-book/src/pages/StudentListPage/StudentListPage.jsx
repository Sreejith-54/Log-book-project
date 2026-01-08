import { useNavigate } from "react-router-dom";

const students = [
  { roll: "AM.SC.U5CSE24654", name: "John Doe" },
  { roll: "AM.SC.U5CSE24655", name: "Jane Smith" },
  { roll: "AM.SC.U5CSE24656", name: "Alex Brown" },
];

const StudentListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="App">

      {/* MAIN */}
      <main>
        {/* TOP CONTROLS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f0f0f0",
            margin: "30px 20px",
            padding: "40px 20px",
            borderRadius: "8px",
          }}
        >
          <div >
            <label style={{ fontSize: "2vh", fontWeight: '600' }}>Select Class: </label>
            <select
              style={{
                fontSize: "1.5vh",
                padding: "10px 5vw",
                marginLeft: "10px",
              }}
            >
              <option>Select</option>
              <option>CSE A</option>
              <option>CSE B</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "1vh" }}>
            <button style={actionBtnStyle} onClick={() => navigate("/admin")}>Student Report</button>
            <button style={actionBtnStyle} onClick={() => navigate("/admin/subject-report")}>Class Report</button>
          </div>
        </div>

        {/* STUDENT LIST */}
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "30px 20px",
            padding: "30px",
            borderRadius: "8px",
          }}
        >
          {/* HEADER ROW */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr 1fr",
              fontSize: "2vh",
              fontWeight: "bold",
              marginBottom: "20px",
              paddingLeft: "20px",
            }}
          >
            <span>Roll No</span>
            <span>Student Name</span>
            <span></span>
          </div>

          {/* DATA ROWS */}
          {students.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                borderRadius: "30px",
                padding: "15px 25px",
                marginBottom: "15px",
                display: "grid",
                gridTemplateColumns: "2fr 3fr 1fr",
                alignItems: "center",
                fontSize: "2vh",
              }}
            >
              <span>{s.roll}</span>
              <span>{s.name}</span>
              <button
                style={viewBtnStyle}
                onClick={() => navigate("/admin/student-report")}
              >
                View report
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/* ===== COMMON INLINE STYLES ===== */

const actionBtnStyle = {
  fontSize: "1.5vh",
  fontWeight: "bold",
  padding: "1vh 2vh",
};

const viewBtnStyle = {
  padding: "6px 18px",
  borderRadius: "20px",
  border: "none",
  backgroundColor: "#e0e0e0",
  cursor: "pointer",
};

export default StudentListPage;
