// const fs = require("fs");
// const path = require("path");
// // 删除
// // fs.unlink(path.resolve(__dirname,"../upload/upload_3cd83f91ce7d7d404409df5db119d209"),function (err) {
// //     console.log(err);
// // })
// // 修改
// fs.rename(path.resolve(__dirname,"../upload/upload_7db89ecec4693a1b0c0d81da92748454"),__dirname+"/e",function (err) {
//     console.log(err);
// })


const picName = "12015970-72d7dfc659582107.lala";
// 原生
const index = picName.lastIndexOf(".");
const keepName = picName.substr(index);
const keepArr = ['.png',".gif","jpg"];
console.log(keepArr.includes(keepName))// true
