const fs = require('fs');

const nodeAddonPath = __dirname + "/build/Release/audio-processor.node";
const destPath = __dirname + '/../src/audio-processor.node'

// TODO Delete if old file exists
// Check if file exists in build folder
fs.copyFile(nodeAddonPath, destPath, (err) => {
    if (err) {
        console.log("error copying file")
        throw err
    }
});
console.log('Moved audio-processor.node to ' + destPath);