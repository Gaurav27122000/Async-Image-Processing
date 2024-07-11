const express = require('express');
const multer = require('multer');
const {
  uploadCSV,
  getStatus,
  getProductsByRequestId,
} = require('../controllers/controller');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-csv', upload.single('csvFile'), uploadCSV);
router.get('/status/:requestId', getStatus);
router.get('/products/:requestId', getProductsByRequestId);

module.exports = router;
