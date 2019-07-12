const md5 = require("md5");
let passWord = '123456';
let str = "_)(*_)(*_)(*_)";
// 颜料  盐料
console.log(md5(passWord+str));