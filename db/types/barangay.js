const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnectionBarangay(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { barangayname, sitio } = req.body;

  if (!barangayname || !sitio) {
    return res.status(400).send('BarangayName and Sitio are required');
  }

  next();
}

// changed barangay table => requestid to userid, barangay /submit added userid to add, added in userservice



router.post('/submit', validateUserData, (req, res) => {
  const { barangayname, sitio, UserID } = req.body;

  const query = 'INSERT INTO barangay (BarangayName, Sitio, UserID) VALUES (?, ?, ?)';

  connection.query(query, [barangayname, sitio, UserID], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnectionBarangay };
