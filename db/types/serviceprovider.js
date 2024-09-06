const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnection(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { providertype, uname, password, email, phonenum, address } = req.body;

  if (!providertype || !uname || !password || !email || !phonenum || !address) {
    return res.status(400).send('ProviderType, Username, Password, Email, PhoneNumber, and Address are required');
  }

  next(); 
}





router.post('/submit', validateUserData, (req, res) => {
  const { providertype, uname, password, email, phonenum, address } = req.body;

  const query = 'INSERT INTO serviceprovider (ProviderType, Username, Password, Email, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(query, [providertype, uname, password, email, phonenum, address], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnection };
