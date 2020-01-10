const csv = require('fast-csv');
const fs = require('fs');

const rows = [
  ['a', 'b'],
  ['a1', 'b1'],
  ['a2', 'b2'],
];

/* csv.writeToPath(('./example_write.csv'), rows)
  .on('error', err => console.error(err))
  .on('finish', () => console.log('Done writing.')); */

const ws = fs.createWriteStream('./example_write.csv', { flags: 'a' });
csv.writeToStream(ws, rows);