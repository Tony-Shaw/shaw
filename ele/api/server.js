const express = require("express");
const app =  express();
const help = require("./module/help");

const jwt =require("./module/jwt");

const bodyParser = require("body-parser");
const db = require("./module/db");
app.use(bodyParser.json());
app.get("/list",function (req,res) {
    res.json({
        ok:1,
        msg:"list"
    })
})
app.post('/login',function (req,res) {

    const {adminName,passWord} = req.body;

    // console.log(req.body);
    setTimeout(() => {
        db.findOne("adminList", {
            adminName,
            passWord: help.md5(passWord)
        }, function (err, adminInfo) {

            // console.log(adminInfo);
            if (adminInfo) {
                //登录成功
                res.json({
                    ok: 1,
                    msg: "登录成功",
                    token: jwt.encode(adminName)
                })
            } else {
                //登录失败
                console.log("faild1111"),
                    help.json(res)
            }
        })
    }, 2000);

   
    
})
app.listen(80,function () {
    console.log("success");
})