import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:3001/api/student-marks')
      .then(response => {
        setStudentMarks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Student Marks</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Iteration 1</th>
          </tr>
        </thead>
        <tbody>
          {studentMarks.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.iteration1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;