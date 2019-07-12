const jwt = require ("jwt-simple");
//生成token

//jwt.encode(荷载（payload）的信息) key:秘钥
const key = "@@@@@";
const token = jwt.encode({
    adminName:"admin",
    exp:Date.now()+10*60*1000,//token的过期时间
},key);
console.log(token);
//验证token(token,秘钥) 返回值是你荷载时添加的内容
console.log(jwt.decode(token,key))