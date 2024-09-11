const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

let connection;

function setConnectionPhoto(conn) {
  connection = conn;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
 
  console.log('File received:', req.file);


  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  
  const img = fs.readFileSync(req.file.path);
  const encode_img = img.toString('base64');
  const final_img = {
    contentType: req.file.mimetype,
    data: Buffer.from(encode_img, 'base64'),
  };


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


module.exports = { router, setConnectionPhoto };
