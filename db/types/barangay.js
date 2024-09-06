const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnection(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { barangayname, streetaddress, city, postalcode } = req.body;

  if (!barangayname || !streetaddress || !city || !postalcode) {
    return res.status(400).send('BarangayName, StreetAddress, City, and PostalCode are required');
  }

  next(); 
}





router.post('/submit', validateUserData, (req, res) => {
  const { barangayname, streetaddress, city, postalcode } = req.body;

  const query = 'INSERT INTO barangay (BarangayName, StreetAddress, City, PostalCode) VALUES (?, ?, ?, ?)';

  connection.query(query, [barangayname, streetaddress, city, postalcode], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnection };
