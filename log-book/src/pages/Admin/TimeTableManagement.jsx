import React, { useState } from "react";
import * as XLSX from "xlsx";

const TimeTableManagement = () => {
  const [data, setData] = useState([]);

  function handleXL(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const buffer = new Uint8Array(event.target.result);

      // 1. Read workbook
      const workbook = XLSX.read(buffer, {
        type: "array",
        cellDates: true,
      });

      // 2. Get first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // 3. Convert sheet to rows
      let rows = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
      });

      // 4. Fix merged/empty Day cells
      let lastDay = "";
      rows = rows.map((row) => {
        if (row.Day) {
          lastDay = row.Day;
        } else {
          row.Day = lastDay;
        }
        return row;
      });

      // 5. Normalize timetable structure
      const normalized = [];

      rows.forEach((row) => {
        const day = row.Day;

        Object.keys(row).forEach((key) => {
          if (key === "Day") return;
          if (!key.includes("-")) return;
          if (!row[key]) return;

          const [startTime, endTime] = key.split("-");

          normalized.push({
            day,
            startTime: startTime.trim(),
            endTime: endTime.trim(),
            subject: row[key],
          });
        });
      });

      setData(normalized);
      console.log(normalized);
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <div>
      <h2>Time Table Upload</h2>
      <br></br>
      <div>
        <div>
        <label>Select Class :</label>
        <select>
            <option>CSE A</option>
        </select>
        </div>
        <br></br>
        <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleXL(e.target.files[0])}
        />
        <div>
            <table>
                
            </table>
        </div>
      </div>

    </div>
  );
};

export default TimeTableManagement;
