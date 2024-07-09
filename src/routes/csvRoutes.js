const express = require('express');
const multer = require('multer');
const { uploadCSV, getStatus } = require('../controllers/csvController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-csv', upload.single('csvFile'), uploadCSV);
router.get('/status/:requestId', getStatus);

module.exports = router;
