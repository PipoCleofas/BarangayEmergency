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


router.get('/getUser', (req, res) => {
  const { username, password } = req.query;

  const verify = `SELECT * FROM user WHERE Username = ? AND Password = ?`;

  connection.query(verify, [username, password], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({
        id: user.UserID,
        username: user.Username,
        fname: user.FirstName,
        lname: user.LastName,
        mname: user.MiddleName,
      });
    } else {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }
  });
});



router.put('/updateUser/:newUsername', (req, res) => {
  const newUsername = req.params.newUsername; 
  const { lname, fname, mname } = req.body;    

  console.log('Received data:', { newUsername, lname, fname, mname });

  if (!lname || !fname || !mname) {
    return res.status(400).send('First name, last name, and middle name are required to identify the user');
  }

  const query = `UPDATE user SET username = ? WHERE FirstName = ? AND LastName = ? AND MiddleName = ?`;
  const values = [newUsername, fname, lname, mname]; 

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('Username updated successfully backend');
  });
});



module.exports = { router, setConnection };
