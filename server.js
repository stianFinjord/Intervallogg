// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // Replace with your MySQL username
  password: 'stianerbest',         // Replace with your MySQL password
  database: 'intervallogg_db'   // Replace with your database name
});

// Test endpoint
app.get('/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Database connected!', data: rows[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});