const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const server = express();
const PORT = 8055;

server.use(cors());        // Enable CORS
server.use(express.json()); // Parse JSON

// DB config
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sknscoe',
  port: 3306,
});

// DB connect
con.connect((err) => {
  if (err) {
    console.error('DB Err:', err.message);
    process.exit(1);
  }
  console.log('DB Connected');
});

// Add user
server.post('/add-user', (req, res) => {
  const { fullname, username, usertype } = req.body;
  const sql = 'INSERT INTO users (FullName, UserName, UserType) VALUES (?, ?, ?)';
  con.query(sql, [fullname, username, usertype], (err) => {
    if (err) return res.json({ status: false, msg: err.message });
    res.json({ status: true, msg: 'User added' });
  });
});

// Get users
server.get('/get-users', (req, res) => {
  const sql = 'SELECT * FROM users';
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, msg: err.message });
    res.json({ status: true, msg: result });
  });
});

// Del user
server.delete('/delete-user/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE ID = ?';
  con.query(sql, [id], (err) => {
    if (err) return res.json({ status: false, msg: err.message });
    res.json({ status: true, msg: 'User deleted' });
  });
});

// Run server
server.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
