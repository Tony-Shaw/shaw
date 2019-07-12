const express = require("express");
const jwt = require("./module/jwt");
const bodyParser = require("body-parser");
const db = require("./module/db");
const help = require("./module/help");
const app = express();
app.use(bodyParser.json());
app.get("/list",function (req,res) {
    res.json({
        ok:1,
        msg:"list"
    })
})

app.post("/login",function (req,res) {
    const {adminName,passWord} = req.body;
    setTimeout(()=>{
        db.findOne("adminList",{
            adminName,
            passWord:help.md5(passWord)
        },function (err,adminInfo) {
            if(adminInfo){
                db.insertOne("adminLog",{
                    adminName,
                    loginTime:Date.now()
                },function (err) {
                    // 登陆成功
                    res.json({
                        ok:1,
                        msg:"登陆成功",
                        adminName,
                        token:jwt.encode(adminName)
                    })
                })

            }else{
                console.log(121212);
                // 登陆失败
                help.json(res);
            }
        })
    },2000)

})
app.get("/adminLog",function (req,res) {
    db.find("adminLog",{
        sortObj:{
            loginTime:-1
        }
    },function (err,adminLog) {
        res.json({
            ok:1,
            adminLog
        })
    })
})
app.listen(80,function () {
    console.log("success");
})