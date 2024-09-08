const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'image_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Multer storage configuration for storing files temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Temporary folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique name for each file
  }
});

const upload = multer({ storage: storage });

// Route to upload an image
app.post('/upload', upload.single('image'), (req, res) => {
  const img = fs.readFileSync(req.file.path); // Read image from filesystem
  const encode_img = img.toString('base64'); // Convert to base64
  const final_img = {
    contentType: req.file.mimetype,
    data: Buffer.from(encode_img, 'base64')
  };

  // Insert into MySQL
  const sql = 'INSERT INTO images (image, contentType) VALUES (?, ?)';
  db.query(sql, [final_img.data, final_img.contentType], (err, result) => {
    if (err) throw err;
    console.log('Image inserted into MySQL');
    res.send('Image uploaded successfully');
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});