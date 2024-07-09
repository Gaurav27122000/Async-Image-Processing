const csv = require('csv-parser');
const { REQUIRED_COLUMNS } = require('./constants');

const extractMetadata = (csvBuffer) => {
  const rows = [];
  return new Promise((resolve, reject) => {
    const csvData = csvBuffer.toString('utf8'); // Convert buffer to string
    const parseStream = csv();

    // Parse CSV data
    parseStream.on('data', (data) => {
      rows.push(data); // Collect rows from CSV
    });

    parseStream.on('end', async () => {
      if (rows.length === 0) {
        return reject(new Error('No data found in CSV'));
      }
      const headers = Object.keys(rows[0]);

      const missingColumns = REQUIRED_COLUMNS.filter(
        (column) => !headers.includes(column)
      );

      if (missingColumns.length > 0) {
        const error = new Error(
          `Missing required columns: ${missingColumns.join(', ')}`
        );
        reject(error);
      } else {
        resolve(rows);
      }
    });
    parseStream.write(csvData);
    parseStream.end();
  });
};

module.exports = extractMetadata;
