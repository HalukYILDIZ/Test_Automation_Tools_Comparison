const fs = require('fs');
const csv = require('fast-csv');

fs.createReadStream('./example.csv')
  .pipe(csv.parse())
  .on('error', error => console.error(error))
  .on('data', row => console.log(`ROW=${JSON.stringify(row)}`))
  .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));