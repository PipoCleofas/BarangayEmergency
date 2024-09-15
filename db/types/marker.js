const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

let connection;

function setConnectionMarker(conn) {
  connection = conn;
}

function validateMarker(req, res, next) {
  const { latitude, longitude, title, description } = req.body;

  if (!latitude || !longitude || !title || !description) {
    return res.status(400).send('latitude, longitude, title, and description are required');
  }

  next();
}


router.post('/submit', validateMarker ,(req, res) => {
  const { latitude, longitude, title, description, UserID } = req.body;

  const query = 'INSERT INTO markerrr (latitude, longitude, title, description, UserID) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [latitude, longitude, title, description, UserID], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(200).json({
       message: 'Data saved successfully',
       id: results.id 
    });
  });
});
a
module.exports = { router, setConnectionMarker };
