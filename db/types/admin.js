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



router.get('/getAdmin', (req, res) => {
  const { username, password } = req.body;

  const verify = `SELECT * FROM admin WHERE username = ${username} AND password = ${password}`

  connection.query(verify, [username, password], (error, results) => {
    if (verify) {
      return res.status(201).send('Login successful');
    }
    res.status(500).send('Username or password is incorrect.');
  });
});

module.exports = { router, setConnectionAdmin };
