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

router.get('/getReports', (req, res) => {
  const { reportID, requestID, description, status, brgyID } = req.query;

  const verify = `SELECT * FROM assistancereport`;

  connection.query(verify, [reportID, requestID, description, status, brgyID], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      const assistancereport = [...results];
      return res.status(200).json({
        reportID: assistancereport.reportID,
        requestID: assistancereport.requestID,
        description: assistancereport.description,
        status: assistancereport.status,
        brgyID: assistancereport.brgyID,
      });
    } else {
      return res.status(401).json({ message: 'Assistance Report details are incorrect.' });
    }
  });
});

module.exports = { router, setConnectionAssistanceReport };
