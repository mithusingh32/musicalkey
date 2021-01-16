const a = require("./build/Release/addon.node")
console.log("Start")
a.getData((err, resp) => {
    console.log("Result")
    console.log(resp);
    // console.log(err);
});
console.log("End")