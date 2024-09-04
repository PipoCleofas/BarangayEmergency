const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

let connection;

function setConnectionMarker(conn) {
  connection = conn;
}

router.post('/submit', (req, res) => {
  const { latitude, longitude, title, description } = req.body;

  if (!latitude || !longitude || !title || !description) {
    return res.status(400).send('latitude, longitude, title, and description are required');
  }

  const query = 'INSERT INTO markerrr (latitude, longitude, title, description) VALUES (?, ?, ?, ?)';

  connection.query(query, [latitude, longitude, title, description], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnectionMarker };
