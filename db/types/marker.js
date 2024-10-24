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


// markers

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

router.post('/:SPtype/submitMarkerSP', validateMarker, (req, res) => {
  const { latitude, longitude, description, UserID } = req.body;
  const SPtype = req.params.SPtype;  

  const query = 'INSERT INTO markerrr (latitude, longitude, title, description, UserID) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [latitude, longitude, SPtype, description, UserID], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }

    res.status(200).json({
      message: 'Data saved successfully',
      id: results.insertId  
    });
  });
});


router.put('/updateMarker/:id', (req, res) => {
  const id = req.params.id;  
  const { newTitle, newLatitude, newLongitude } = req.body; 

  if (!newTitle || newLatitude === undefined || newLongitude === undefined) {
    return res.status(400).send('New title, latitude, and longitude are required');
  }

  const query = `UPDATE marker SET title = ?, latitude = ?, longitude = ? WHERE id = ?`;
  const values = [newTitle, newLatitude, newLongitude, id];  // Set the new values

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Marker not found');
    }

    res.status(200).send('Marker updated successfully');
  });
});

router.get('/:SPtype/checkMarkerTitleExists', (req, res) => {
  const { title } = req.query; 

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const checkQuery = 'SELECT * FROM markerrr WHERE title = ?';

  connection.query(checkQuery, [title], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      return res.status(200).json({ 
        message: 'Marker with this title already exists',
        data: results 
      });
    } else {
      return res.status(400).json({ 
        message: 'No marker with this title exists', 
        data: null 
      });
    }
  });
});



module.exports = { router, setConnectionMarker };
