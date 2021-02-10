const a = require("./build/Release/addon.node")
console.log("Start")
a.getData("/home/sukhmeetkhalar/Downloads/Kasoor.mp3", (err, resp) => {
    console.log("Result")
    console.log(resp);
    // console.log(err);
});

a.getData("/home/sukhmeetkhalar/Downloads/test.mp3", (err, resp) => {
    console.log("Result")
    console.log(resp);
    // console.log(err);
});


a.getData("/home/sukhmeetkhalar/Downloads/atest.mp3", (err, resp) => {
    console.log("Result")
    console.log(resp);
    // console.log(err);
});

console.log("End")