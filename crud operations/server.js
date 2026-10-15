const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'college'
});

// READ
app.get('/students', async (req, res) => {
    const con = await db;
    const [rows] = await con.query('SELECT * FROM students');
    res.json(rows);
});

// CREATE
app.post('/students', async (req, res) => {
    const { name, department, year } = req.body;
    const con = await db;

    await con.query(
        'INSERT INTO students (name, department, year) VALUES (?, ?, ?)',
        [name, department, year]
    );

    res.json({ message: 'Student added' });
});

// UPDATE
app.put('/students/:id', async (req, res) => {
    const { name, department, year } = req.body;
    const con = await db;

    await con.query(
        'UPDATE students SET name=?, department=?, year=? WHERE id=?',
        [name, department, year, req.params.id]
    );

    res.json({ message: 'Student updated' });
});

// DELETE
app.delete('/students/:id', async (req, res) => {
    const con = await db;
    await con.query('DELETE FROM students WHERE id=?', [req.params.id]);
    res.json({ message: 'Student deleted' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});