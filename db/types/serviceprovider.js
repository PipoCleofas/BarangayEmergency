const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnectionServiceProvider(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { providertype, uname, password, email, phonenum, address } = req.body;

  if (!providertype || !uname || !password || !email || !phonenum || !address) {
    return res.status(400).send('ProviderType, Username, Password, Email, PhoneNumber, and Address are required');
  }

  next(); 
}




router.get('/getServiceProvider', (req, res) => {
  const { username, password } = req.body;

  const verify = `SELECT * FROM serviceprovider WHERE username = ${username} AND password = ${password}`

  connection.query(verify, [username, password], (error, results) => {
    if (verify) {
      return res.status(201).send('Login successful');
    }
    res.status(500).send('Username or password is incorrect.');
  });
});

module.exports = { router, setConnectionServiceProvider };
