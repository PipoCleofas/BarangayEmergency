const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: 'admin',
  database: 'rescuelink'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Example endpoint to fetch data
app.get('/api/user', (req, res) => {
  connection.query('SELECT * FROM user', (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/admin', (req, res) => {
    connection.query('SELECT * FROM admin', (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.json(results);
      }
    });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});