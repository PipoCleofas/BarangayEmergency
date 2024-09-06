const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnection(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { userid, providerid, requesttype, requeststatus} = req.body;

  if (!userid || !providerid || !requesttype || !requeststatus) {
    return res.status(400).send('UserID, ProviderID, RequestType, and RequestStatus are required');
  }

  next(); 
}





router.post('/submit', validateUserData, (req, res) => {
  const { userid, providerid, requesttype, requeststatus} = req.body;

  const query = 'INSERT INTO servicerequest (UserID, ProviderID, RequestType, RequestStatus) VALUES (?, ?, ?, ?)';

  connection.query(query, [userid, providerid, requesttype, requeststatus], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnection };
