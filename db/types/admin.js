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
  const { username, password } = req.query; 

  const verify = `SELECT * FROM admin WHERE Username = ? AND Password = ?`;

  connection.query(verify, [username, password], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      let admin = results[0];
      return res.status(200).json({ 
        username: admin.Username,
      });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});



module.exports = { router, setConnectionAdmin };
