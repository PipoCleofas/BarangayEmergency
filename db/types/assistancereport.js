const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnectionAssistanceReport(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { requestid, description, status, barangayid } = req.body;

  if (!requestid || !description || !status || !barangayid ) {
    return res.status(400).send('RequestID, Description, Status, and BarangayID are required');
  }

  next(); 
}





router.post('/submit', validateUserData, (req, res) => {
  const { requestid, description, status, barangayid } = req.body;

  const query = 'INSERT INTO assistancereport (RequestID, Description, Status, BarangayID) VALUES (?, ?, ?, ?)';

  connection.query(query, [requestid, description, status, barangayid], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnectionAssistanceReport };
