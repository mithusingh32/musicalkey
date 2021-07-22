const fs = require('fs');

const nodeModulePath = __dirname + "/build/Release/audio-processor.node";
const destPath = __dirname + '/../src/audio-processor.node'

// Check to see if file exists
fs.access(nodeModulePath, fs.constants.F_OK, (err) => {
    if (err) throw err
});

// Delete destination file if it exists
if (fs.statSync(destPath, { throwIfNoEntry: false }) !== undefined) fs.unlinkSync(destPath)

// If it exists, move it 
fs.copyFileSync(nodeModulePath, destPath, fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE_FORCE, (err) => {
    if (err) throw err
})

console.log('Moved audio-processor.node to ' + destPath);