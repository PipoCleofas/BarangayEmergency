const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3308',
  user: 'root',
  password: 'admin',
  database: 'rescuelink'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});


const { router: userRouter, setConnection } = require('./types/user');


setConnection(connection);
app.use('/user', userRouter);

const { router: markerRouter, setConnectionMarker } = require('./types/marker');

setConnectionMarker(connection);
app.use('/marker', markerRouter);

// for testing purposes
app.get('/test', (req, res) => {
  res.send('Server is working');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});