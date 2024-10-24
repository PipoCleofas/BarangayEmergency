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
  const { username, password } = req.query;

  const verify = `SELECT id FROM serviceproviderrrr WHERE username = ? AND password = ?`;

  connection.query(verify, [username, password], (error, results) => {
    if (error) {
      return res.status(500).send('Server error occurred.');
    }

    if (results.length > 0) {
      const userId = results[0].id; 
      return res.status(200).json({ success: true, message: 'Login successful', userId });  
    } else {
      return res.status(200).json({ success: false, message: 'Username or password is incorrect' });
    }
  });
});



module.exports = { router, setConnectionServiceProvider };
