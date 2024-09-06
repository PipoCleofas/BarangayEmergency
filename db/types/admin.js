const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnectionAdmin(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { uname, password, email } = req.body;

  if (!uname || !password || !email) {
    return res.status(400).send('Username, Password, and Email are required');
  }

  next(); 
}





router.post('/submit', validateUserData, (req, res) => {
  const { uname, password, email } = req.body;

  const query = 'INSERT INTO admin (Username, Password, Email) VALUES (?, ?, ?)';

  connection.query(query, [uname, password, email], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

module.exports = { router, setConnectionAdmin };
