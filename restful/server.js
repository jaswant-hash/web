const express = require('express');
const app = express();

app.use(express.json());

// Data stored in an array
let students = [
  { id: 1, name: 'Arun', department: 'CSE', year: 4 },
  { id: 2, name: 'Priya', department: 'IT', year: 3 },
  { id: 3, name: 'Karthik', department: 'ECE', year: 2 }
];
let nextId = 4;

// GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET one student by id
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

// POST add a new student
app.post('/students', (req, res) => {
  const { name, department, year } = req.body;
  if (!name || !department || !year) {
    return res.status(400).json({ message: 'name, department and year are required' });
  }
  const student = { id: nextId++, name, department, year };
  students.push(student);
  res.status(201).json(student);
});

// PUT update a student
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const { name, department, year } = req.body;
  if (name) student.name = name;
  if (department) student.department = department;
  if (year) student.year = year;

  res.json(student);
});

// DELETE a student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });

  const deleted = students.splice(index, 1);
  res.json({ message: 'Student deleted', student: deleted[0] });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});