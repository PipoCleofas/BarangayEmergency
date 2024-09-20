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
  const { id, latitude, longitude, title, description, UserID } = req.query;

  const verify = `SELECT * FROM markerrr WHERE id = ? AND UserID = ?`;

  connection.query(verify, [id, UserID], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      const markerrr = results[0];
      return res.status(200).json({
        id: markerrr.id,
        latitude: markerrr.latitude,
        longitude: markerrr.longitude,
        title: markerrr.title,
        description: markerrr.description,
        UserID: markerrr.UserID,
      });
    } else {
      return res.status(401).json({ message: 'Markers details are incorrect.' });
    }
  });
});

module.exports = { router, setConnectionMarker };
