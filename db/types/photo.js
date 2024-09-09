const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

let connection;

// Function to set the MySQL connection object
function setConnectionPhoto(conn) {
  connection = conn;
}

// store files temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads'); // Ensure the uploads folder exists and has write permissions
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

// POST route to handle image uploads
router.post('/upload', upload.single('image'), (req, res) => {
  // Log the file details to ensure it was received
  console.log('File received:', req.file);

  // Check if no file was uploaded
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Read and process the uploaded file
  const img = fs.readFileSync(req.file.path);
  const encode_img = img.toString('base64');
  const final_img = {
    contentType: req.file.mimetype,
    data: Buffer.from(encode_img, 'base64'),
  };

  // Insert image data into the database
  const query = 'INSERT INTO images (image, contentType) VALUES (?, ?)';
  
  connection.query(query, [final_img.data, final_img.contentType], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }

    // Delete the file from the server after saving to the database
    fs.unlinkSync(req.file.path);

    res.status(201).send('Image uploaded and saved successfully');
  });
});


// Export the router and connection setter function
module.exports = { router, setConnectionPhoto };
