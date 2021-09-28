const fs = require('fs');

const nodeModulePath = __dirname + "/build/Release/audio-processor.node";
const destPath = __dirname + '/../src/audio-processor.node'

// Delete destination file if it exists
if (fs.statSync(destPath, { throwIfNoEntry: false }) !== undefined) fs.unlinkSync(destPath)

// Check to see if file exists
fs.access(nodeModulePath, fs.constants.F_OK, (err) => {
    // If it exists, move it 
    fs.copyFile(nodeModulePath, destPath, fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE_FORCE, (err) => {
        if (err) {
            console.log("error copying file")
            throw err
        }
    })
    if (err) throw err
});



console.log('Moved audio-processor.node to ' + destPath);