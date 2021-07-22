/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

let directoriesToDelete;
if (process.argv.slice(2).length > 0)
  directoriesToDelete = process.argv.slice(2);
else {
  directoriesToDelete = [
    '.eslintcache',
    'node_modules',
    'release',
    'src/dist',
    'src/node_modules',
    'src/audio-processor.node',
    'src/main.prod.js',
    'src/main.prod.js.LICENSE.txt',
    'audio-processor.node',
    'audio-processor/build',
  ];
}

directoriesToDelete.forEach((toDelete) => {
  // Delete destination file if it exists
  const destPath = path.join(__dirname, toDelete);
  fs.lstat(destPath, { throwIfNoEntry: false }, (err, stats) => {
    if (stats !== undefined) {
      if (stats.isFile()) {
        fs.unlinkSync(destPath);
        console.log('Deleted ', destPath);
      }

      if (stats.isDirectory()) {
        fs.rmdir(destPath, { recursive: true, force: true }, (error) => {
          if (error) {
            return console.log('error occurred in deleting directory', err);
          }
          return console.log('%s deleted successfully', destPath);
        });
      }
    }
  });
});
