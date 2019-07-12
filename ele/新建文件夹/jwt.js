const jwt = require("jwt-simple");
// 生成token
// jwt.encode(荷载（payload）的信息)  key:密钥
const key = "^%&*$%&(*(&(&)(*(*%*&%*";
const token = jwt.encode({
    adminName:"admin",
    exp:Date.now()+10*60*1000,// token的过期时间
},key);
console.log(token);
//验证token decode(token,密码)，返回的值为你茶载时添加的内容。
console.log(jwt.decode(token,key))
try{
    console.log(jwt.decode("as;dlkfa;sldkfa;lskdfjl",key))
}
catch(err) {
    console.log(err)
}

console.log(121212);