const md5 = require("md5");
let str = "_)(*_)(*_)(*_)";
module.exports.md5 = function (v) {
    return md5(v+str);
}


module.exports.getNowTime = function () {
    let time = new Date();
    return time.getFullYear()+"-"
        +(time.getMonth()+1).toString().padStart(2,"0")+"-"
        + (time.getDate()).toString().padStart(2,"0")+" "
        + (time.getHours()).toString().padStart(2,"0") + ":"
        + (time.getMinutes()).toString().padStart(2,"0") + ":"
        + (time.getSeconds()).toString().padStart(2,"0");
}
module.exports.json = function (res,ok=-1,msg="网络连接错误") {
    res.json({
        ok,
        msg
    })
}