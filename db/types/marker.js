const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnectionMarker(conn) {
  connection = conn;
}


router.post('/submit', (req, res) => {
  const { lname, fname, mname, password, birthday, Email, PhoneNumber, Address, AdminID } = req.body;

  if (!lname || !fname || !mname || !password || !birthday) {
    return res.status(400).send('Last name, First name, Middle Name, Password, and Birthday are required');
  }

  const query = 'INSERT INTO user (LastName, FirstName, MiddleName, Password, Birthday, Email, PhoneNumber, Address, AdminID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, [lname, fname, mname, password, birthday, Email, PhoneNumber, Address, AdminID], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnectionMarker };