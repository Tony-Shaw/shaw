const express = require("express");
const path = require("path");
const help = require("./module/help");
// const formidable = require("formidable");
const fs = require("fs");
const db = require("./module/db");
const upPic = require ("./module/upPic");
const app = express();
//将manage设为静态资源
app.use(express.static(path.resolve(__dirname,"../manage")));
app.use(express.static(path.resolve(__dirname,"../site")));
app.use(express.static(__dirname+"/upload"));
app.post("/adv",function(req,res){
    upPic(req,"advPic",function({ok,msg,params}){
        if(ok===3){
            db.insertOne("advList",{
                advName:params.advName,
                advPic:params.newPicName,
                advType:params.advType/1,
                advHref:params.advHref/1,
                addTime:help.getNowTime(),//Date.now(),
                upTime:help.getNowTime(),//Date.now(),
                orderNum:params.orderNum/1
            },function(err,reuslts){
                // res.json({
                //     ok:1,
                //     msg:"成功"
                // })
                help.json(res,1,"success");
            })
            
        }else{
            help.json(res,-1,msg)
        }
    })
})
app.put("/adv",function (req,res) {
    console.log(111111);
    upPic(req,"advPic",function ({ok,msg,params}) {
        console.log(22222,ok,msg,params)
        if(ok === 1){// 未上传图片
            console.log(33333);
            db.updateOneById("advList",params.id,{
                $set:{
                    advName:params.advName,
                    advType:params.advType/1,
                    advHref:params.advHref/1,
                    upTime:help.getNowTime(),//Date.now(),
                    orderNum:params.orderNum/1
                }
            },function (err,results) {
                help.json(res,1,"修改成功");
            })
        }else if(ok === 3){// 成功
            db.findOneById("advList",params.id,function (err,info) {
                fs.unlink(__dirname+"/upload/"+info.advPic,function (err) {
                    db.updateOneById("advList",params.id,{
                        $set:{
                            advName:params.advName,
                            advPic:params.newPicName,
                            advType:params.advType/1,
                            advHref:params.advHref/1,
                            upTime:help.getNowTime(),//Date.now(),
                            orderNum:params.orderNum/1
                        }
                    },function (err,reuslts) {
                        help.json(res,1,"修改成功")
                    })
                })
            })
        }else{
            help.json(res,-1,msg);
        }
    })
})

//append
// app.post("/adv",function(req,res){
//     const form = new formidable.IncomingForm();
//     form.keepExtensions = true; //是否保留拓展名
//     form.uploadDir = __dirname+"/upload";
//     //params:除了图片意外的信息
//     form.parse(req,function(err,params,file){
//         const advPic = file["advPic"];
//         if(advPic.size <= 0){
//             fs.unlink(advPic.path,function(err){
//                 help.json(res,-1,"请选择您要上传的图片");
//             })
//         }else{
//             //验证上传是否合法
//             const index = advPic.name.lastIndexOf(".");
//             const keepName = advPic.name.substr(index).toLowerCase();
//             const keepArr = ['.png',".gig",".jpg"];
//             // console.log(keepArr.includes(keepName));//true
//             const newPicName = Date.now()+keepName;
//             if(keepArr.includes(keepName)){
//                 fs.rename(advPic.path,__dirname+"/upload/"+newPicName,function(err){
//                     //"/upload/"两边的线缺一不可；
//                     db.insertOne("advList",{
//                         advName:params.advName,
//                         advPic:newPicName,
//                         advType:params.advType/1,
//                         advHref:params.advHref/1,
//                         addTime:help.getNowTime(),//Date.now(),
//                         upTime:help.getNowTime(),//Date.now(),
//                         orderNum:params.orderNum/1
//                     },function(err,reuslts){
//                         res.json({
//                             ok:1,
//                             msg:"成功"
//                         })
//                     })
                    
//                 })
              
//             }else{
//                 fs.unlink(advPic.path,function(err){
//                     help.json(res,-1,"请上传符合要求的图片，目前支持.png .jpg .gif");
//                 })
//             }
            
//         }
//     // console.log(params,file);

       
//     })

//     // console.log(form);
//     // console.log(fs);
// });
// modify
// app.put("/adv",function(req,res){
//     const form = new formidable.IncomingForm();
//     form.keepExtensions = true; //是否保留拓展名
//     form.uploadDir = __dirname+"/upload";
//     //params:除了图片意外的信息
//     form.parse(req,function(err,params,file){
//         const advPic = file["advPic"];
//         if(advPic.size <= 0){
//             fs.unlink(advPic.path,function(err){
//                //modity(no include img)
              
//                db.updateOneById("advList",params.id,{
//                 $set:{
//                     advName:params.advName,
//                     advType:params.advType/1,
//                     advHref:params.advHref/1,
//                     upTime:help.getNowTime(),//Date.now(),
//                     orderNum:params.orderNum/1
//                 }
               
//                },function(err,reuslts){
//                    if(err) console.log(err);
//                    else help.json(res,1,"modify success");
//                })
//             })
//         }else{
//             //验证上传是否合法
//             const index = advPic.name.lastIndexOf(".");
//             const keepName = advPic.name.substr(index).toLowerCase();
//             const keepArr = ['.png',".gig",".jpg"];
//             // console.log(keepArr.includes(keepName));//true
//             const newPicName = Date.now()+keepName;
//             if(keepArr.includes(keepName)){
//                     //"/upload/"两边的线缺一不可；
//                 fs.rename(advPic.path,__dirname+"/upload/"+newPicName,function(err){
//                     db.findOneById("advList",params.id,function(err,info){
//                         fs.unlink(__dirname+"/upload/"+info.advPic,function(err){
//                             db.updateOneById("advList",params.id,{
//                                 $set:{
//                                     advName:params.advName,
//                                     advPic:newPicName,
//                                     advType:params.advType/1,
//                                     advHref:params.advHref/1,
//                                     upTime:help.getNowTime(),//Date.now(),
//                                     orderNum:params.orderNum/1
//                                 }
                              
                            
//                             },function(err,reuslts) {
//                                 if(err) console.log(err); 
//                                 help.json(res,1,"modify success")
//                             })
//                         })
//                     })
                    
//                 })
              
//             }else{
//                 fs.unlink(advPic.path,function(err){
//                     help.json(res,-1,"请上传符合要求的图片，目前支持.png .jpg .gif");
//                 })
//             }
            
//         }
//     // console.log(params,file);

//         })
//     });
app.delete("/adv/:id",function (req,res) {
    const id = req.params.id;
    /*
    * 根据ID将数据清除
    * 清除图片
    * 1、根据ID获得广告信息
    * 2、得到图片名字
    * 3、得到图片地址
    * 4、删除 图片
    * 5、根据ID删除该文档*/
    db.findOneById("advList",id,function (err,info) {
        fs.unlink(__dirname+"/upload/"+info.advPic,function () {
            db.deleteOneById("advList",id,function (err) {
                if(err) help.json(err);
                else help.json(res,1,"删除成功！")
            })
        })
    })
})

app.get("/adv",function (req,res) {
    let pageIndex = (req.query.pageIndex || 1)/1;
    let whereObj = {};
    let keyword = req.query.keyword || "";
    let advType = (req.query.advType || 0)/1;
    if(keyword.length>0){// 搜索
        whereObj.advName = new RegExp(keyword);
    }
    if(advType !== 0){
        whereObj.advType = advType;
    }

    db.count("advList",whereObj,function (count) {
        const limit = 5;// 每页显示的数量
        // console.log(err,count);
        let pageSum = Math.ceil(count/limit);// 总页数
        if(pageSum < 1) pageSum = 1;
        if(pageIndex >pageSum) pageIndex = pageSum;
        if(pageIndex < 1) pageIndex =1;
        db.find("advList",{
            limit,
            skip:(pageIndex-1)*limit,
            whereObj,
            sortObj:{
                orderNum:-1,
                addTime:-1
            }
        },function (err,advList) {
            console.log(pageIndex,pageSum);
            res.json({
                ok:1,
                msg:"成功",
                advList,
                pageIndex,
                pageSum
            })
        })
    })
});
//根据id获得广告信息
app.get("/adv/:id",function(req,res){
    const id = req.params.id;
    db.findOneById("advList",id,function(err,advInfo){
        res.json({
            ok:1,
            msg:"success",
            advInfo
        })
    })
})
app.get("/adv/:typeId/:limit",function(req,res){
    console.log(req.params);
    db.find("advList",{
        whereObj:{
            advType:req.params.typeId/1
        },
        limit:req.params.limit/1,
        sortObj:{
            orderNum:-1,
            addTime:-1
        }
    },function(err,advList){
        res.json({
            ok:1,
            advList
        })
    })
})
app.listen(80,function(){
    console.log("success");
})