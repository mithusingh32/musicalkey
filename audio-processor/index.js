/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
const a = require('./build/Release/addon.node');

a.getData('/home/sukhmeetkhalar/Downloads/Kasoor.mp3', (err, resp) => {
    console.log(resp);
});
a.getData('/home/sukhmeetkhalar/Downloads/test.mp3', (err, resp) => {
    console.log(resp);
});
a.getData('/home/sukhmeetkhalar/Downloads/atest.mp3', (err, resp) => {
    console.log(resp);
});
