const jwt = require("jwt-simple");
const key = "(&&)(*&^&^%&^)(*(_)(*_)"
module.exports = {
    // 生成token
    encode(adminName,exp=10*60*1000){
       return jwt.encode({
           adminName,
           exp
       },key)
    },
    // 解析token
    decode(token){
        try{
            const info = jwt.decode(token,key);
            if(info.exp > Date.now()){//未过期
                return {
                    ok:1,
                    msg:"成功",
                    info
                }
            } else{
                return {
                    ok:-1,
                    msg:"过期啦"
                }
            }
        }catch(err) {
            return {
                ok:-1,
                msg:"解析失败"
            }
        }
    }
}