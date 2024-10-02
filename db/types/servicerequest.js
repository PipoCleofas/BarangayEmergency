const express = require('express');
const router = express.Router();
let connection;

function setConnectionServiceRequest(conn) {
  connection = conn;
}

function validateUserData(req, res, next) {
  const { requesttype, requeststatus } = req.body;
  if (!requesttype || !requeststatus) {
    return res.status(400).send('RequestType and RequestStatus are required');
  }
  next(); 
}

router.post('/submit', validateUserData, (req, res) => {
  const { UserID, requesttype, requeststatus } = req.body;

  if (!connection) {
    return res.status(500).send('No database connection');
  }

  const query = `INSERT INTO servicerequesttt (UserID, RequestType, RequestStatus) VALUES (?,?, ?)`;

  connection.query(query, [UserID, requesttype, requeststatus], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Service request submitted successfully');
  });
});

router.get('/getRequests', (req, res) => {
  const verify = 'SELECT * FROM servicerequesttt';

  connection.query(verify, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      // Return the array of service requests
      return res.status(200).json(results);
    } else {
      return res.status(401).json({ message: 'No service requests found.' });
    }
  });
});

router.put('/updateRequest/:newStatus', (req, res) => {
  const newStatus = req.params.newStatus; 
  const { UserID } = req.body;    

  console.log('Received data:', { newStatus, UserID });

  if (!UserID) {
    return res.status(400).send('UserID is required');
  }

  const query = `UPDATE servicerequesttt SET RequestStatus = ? WHERE UserID = ?`;
  const values = [newStatus, UserID]; 

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Request not found');
    }

    res.status(200).send('Status updated successfully backend');
  });
});



module.exports = { router, setConnectionServiceRequest };
