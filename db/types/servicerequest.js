const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnectionServiceRequest(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { requesttype, requeststatus} = req.body;

  if (!requesttype || !requeststatus) {
    return res.status(400).send('RequestType, and RequestStatus are required');
  }

  next(); 
}





router.post('/submit', (req, res) => {
  const { requesttype, requeststatus} = req.body;

  if (!requesttype || !requeststatus) {
    return res.status(400).send('RequestType, and RequestStatus are required');
  }

  const query = 'INSERT INTO servicerequestt (RequestType, RequestStatus) VALUES (?, ?)';

  connection.query(query, [requesttype, requeststatus], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnectionServiceRequest };
