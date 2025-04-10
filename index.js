const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const server = express();
const PORT = 8055;

server.use(cors());
server.use(express.json());

// MySQL Connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sknscoe',
  port: 3306,
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to DB:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database!');
});

// Add User
server.post('/add-user', (req, res) => {
  const { fullname, username, usertype } = req.body;
  const sql = 'INSERT INTO users (FullName, UserName, UserType) VALUES (?, ?, ?)';
  con.query(sql, [fullname, username, usertype], (error) => {
    if (error) return res.json({ status: false, message: error.message });
    res.json({ status: true, message: 'User added successfully' });
  });
});

// Get Users
server.get('/get-users', (req, res) => {
  const sql = 'SELECT * FROM users';
  con.query(sql, (error, result) => {
    if (error) return res.json({ status: false, message: error.message });
    res.json({ status: true, message: result });
  });
});

// Delete User
server.delete('/delete-user/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE ID = ?';
  con.query(sql, [id], (error) => {
    if (error) return res.json({ status: false, message: error.message });
    res.json({ status: true, message: 'User deleted successfully' });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
