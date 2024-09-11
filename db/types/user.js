const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnection(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { lname, fname, mname, password, birthday } = req.body;

  if (!lname || !fname || !mname || !password || !birthday) {
    return res.status(400).send('Last name, First name, Middle Name, Password, and Birthday are required');
  }

  next(); 
}




router.post('/submit', validateUserData, (req, res) => {
  const {  lname, fname, mname, password, birthday, Email, PhoneNumber, Address, AdminID } = req.body;

  const query = 'INSERT INTO user (LastName, FirstName, MiddleName, Password, Birthday, Email, PhoneNumber, Address, AdminID) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, [ lname, fname, mname, password, birthday, Email, PhoneNumber, Address, AdminID], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

/*
router.get('/getUser', (req, res) => {
  const { username, password } = req.body;

  const verify = `SELECT * FROM user WHERE username = ${username} AND password = ${password}`

  connection.query(verify, [username, password], (error, results) => {
    if (verify) {
      return res.status(201).send('Login successful');
    }
    res.status(500).send('Username or password is incorrect.');
  });
});*/

module.exports = { router, setConnection };
