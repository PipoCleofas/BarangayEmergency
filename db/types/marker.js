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

router.get('/getMarker', (req, res) => {
  const query = `SELECT * FROM markerrr WHERE title != 'Canceled Service'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.status(200).json(results); 
  });
});

router.put('/updateMarkerTitle/:id', (req, res) => {
  const id = req.params.id;  // Get the ID from the URL parameter
  const { newTitle } = req.body;  // Get the new title from the request body

  if (!newTitle) {
    return res.status(400).send('New title is required');
  }

  const query = `UPDATE marker SET title = ? WHERE id = ?`;
  const values = [newTitle, id];  // Set the new title and id

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Marker not found');
    }

    res.status(200).send('Marker title updated successfully');
  });
});



module.exports = { router, setConnectionMarker };
