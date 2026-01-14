const express=require("express");
const cors=require("cors");
const {Client}=require("pg");
const app=express();

app.use(cors({origin:'*'}));
app.use(express.json());

const connection=new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    database:"logbook",
})
connection.connect().then(()=>{
    console.log("Connected to logbook database");

})
app.post('/login', async (req, res) => {
    const { username, password } = req.body; 
    console.log(username);
    console.log(password);

    try {
        const result = await connection.query(
            "SELECT * FROM faculty WHERE faculty_id=$1 AND authorization_key=$2 AND is_active=true",
            [username, password]
        );

        if (result.rows.length > 0) {
            res.status(200).json({
                message: "Login successful",
                user: result.rows[0]
            });
        } else {
            res.status(401).json({ message: "Invalid credentials or account inactive" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
app.get('/api/attendance-report', async (req, res) => {
    const { class_id, course_code, startDate, endDate } = req.query;

    try {
        let dateFilter = "";
        const queryParams = [class_id, course_code];

        if (startDate && endDate) {
            dateFilter = "AND s.session_date BETWEEN $3 AND $4";
            queryParams.push(startDate, endDate);
        }

        const query = `
            SELECT 
                stu.roll_number AS rollno,
                stu.full_name AS name,
                COUNT(ar.id) FILTER (WHERE ar.status = 'present') AS attended,
                COUNT(s.id) AS total
            FROM students stu
            JOIN classes c ON stu.class_id = c.id
            JOIN class_courses cc ON c.id = cc.class_id
            LEFT JOIN attendance_sessions s ON c.id = s.class_id 
                AND s.faculty_id = cc.faculty_id
                ${dateFilter}
            LEFT JOIN attendance_records ar ON s.id = ar.session_id 
                AND stu.id = ar.student_id
            WHERE c.id = $1 AND cc.course_code = $2
            GROUP BY stu.id, stu.roll_number, stu.full_name
            ORDER BY stu.roll_number;
        `;

        const result = await connection.query(query, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
// Get all active classes
app.get('/api/classes', async (req, res) => {
    try {
        const result = await connection.query(
            "SELECT id, section, (SELECT branch FROM batches WHERE id = batch_id) as branch FROM classes WHERE is_active = true"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch classes" });
    }
});

// Get courses assigned to a specific class
app.get('/api/courses/:classId', async (req, res) => {
    const { classId } = req.params;
    try {
        const result = await connection.query(
            `SELECT c.course_code, c.course_name 
             FROM courses c 
             JOIN class_courses cc ON c.course_code = cc.course_code 
             WHERE cc.class_id = $1`, 
            [classId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch courses" });
    }
});
app.get('/api/students/:classId', async (req, res) => {
    try {
        const { classId } = req.params;
        const result = await connection.query(
            "SELECT id, roll_number as roll, full_name as name FROM students WHERE class_id = $1 AND is_active = true ORDER BY roll_number",
            [classId]
        );
        const students = result.rows.map(s => ({ ...s, present: true }));
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
let individualStudentReport = [];

app.get('/api/student-report/:rollno', async (req, res) => {
    const { rollno } = req.params;
    
    try {
        const query = `
          SELECT 
    s.full_name AS student_name,
    s.roll_number,
    c.course_code,
    c.course_name,
    COUNT(ar.id) AS total_sessions,
    SUM(CASE WHEN ar.status = 'present' THEN 1 ELSE 0 END) AS attended,
    ROUND(
        (SUM(CASE WHEN ar.status = 'present' THEN 1 ELSE 0 END)::numeric / 
         NULLIF(COUNT(ar.id), 0)) * 100, 0
    ) || '%' AS attendance_percentage
FROM students s
JOIN classes cl ON s.class_id = cl.id
JOIN class_courses cc ON cl.id = cc.class_id
JOIN courses c ON cc.course_code = c.course_code
JOIN attendance_sessions ads ON cl.id = ads.class_id
JOIN attendance_records ar ON ads.id = ar.session_id AND s.id = ar.student_id
WHERE s.roll_number = $1
GROUP BY s.full_name, s.roll_number, c.course_code, c.course_name
ORDER BY c.course_code;
        `;

        const result = await connection.query(query, [rollno]);

        if (result.rows.length === 0) {
            individualStudentReport = [];
            return res.status(404).json({ message: "No attendance records found" });
        }
        
        individualStudentReport = result.rows;
        
        res.status(200).json(individualStudentReport);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get('/api/getReport',(req,res)=>{
    if(individualStudentReport.length===0){
        res.status(404).json({message:"No data found"});
    }
    else{
        res.status(200).json(individualStudentReport)
    }
})
app.post('/api/submit-attendance', async (req, res) => {
    const { class_id, session_date, class_status, faculty_id, attendance_data } = req.body;

    try {
        await connection.query('BEGIN');

        const sessionResult = await connection.query(
            `INSERT INTO attendance_sessions (class_id, session_date, class_status, faculty_id) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [class_id, session_date, class_status, faculty_id]
        );
        const sessionId = sessionResult.rows[0].id;

        const recordQueries = attendance_data.map(student => {
            return connection.query(
                "INSERT INTO attendance_records (session_id, student_id, status) VALUES ($1, $2, $3)",
                [sessionId, student.id, student.present ? 'present' : 'absent']
            );
        });

        await Promise.all(recordQueries);
        await connection.query('COMMIT');

        res.status(200).json({ message: "Attendance marked successfully" });
    } catch (err) {
        await connection.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
});
app.listen(3000,()=>{
    console.log("app is running on 3000 port")
})
