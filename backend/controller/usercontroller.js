const express= require("express");
const mongoose=require("mongoose");
const asynchandler=require("express-async-handler");
const bspass=require("bcryptjs");
const imageUrl=require("../schema/baseurl");
const JWT_SECRET = "your_secret_key";
const jwt=require("jsonwebtoken");
const userModel=require('../schema/userschema');

var insertData = asynchandler(async (req, res) => {
    try {
        console.log("req\n",req);
        console.log("\n\nreq-file\n",req.file);
        var salt=await bspass.genSalt(10);
        var hash=await bspass.hash(req.body.user_pass,salt);
        var newData=await userModel.create({
                   "user_id":"User"+Math.floor(Math.random()*999),
                   "user_name":req.body.user_name,
                   "user_email":req.body.user_email,
                   "user_pass":hash,
            "user_image":imageUrl+"/uploads/"+req.file.filename
        })

        if (newData){
             res.status(200).json({"success":true,"message":"New Data inserted"})
        }
        else{
             res.status(403).json({"success":false,"message":"Error Occured"})

        }
        }
    
    catch(err){
        console.log(err)
    }
}
)

var getalldata=asynchandler(async(req,res)=>{
    var alldata=await userModel.find().exec();
         if(alldata){
        res.status(200).json(alldata);
    }
    else{
        res.status(403).json({"message":"Something went wrong"})
    }

})
var findData=asynchandler(async(req,res)=>{
    // console.log("findData",req.body)
    var user=await userModel.findOne({"user_email":req.body.user_email}).exec();
    console.log("findData",user)    
    if(!user){
           res.status(403).json({"success":false,"message":"User email Mismatch"})
       }
       var passMatch=await bspass.compare(req.body.user_pass,user.user_pass);
       console.log('passMatch: ', passMatch)
       if(!passMatch){
       res.status(403).json({"success":false, "message":" user password mismatch"});
           }
      else{
   
        //   res.status(200).json({
        //    "success":true,
        //    "data":user,
        //       "message":"Login successful"
        //    });

        const token = jwt.sign({ _id: user.user_id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({
    "token":token,
    "user": { "id": user.user_id, "user_name": user.user_name, "email": user.user_email ,"user_image":user.user_image}
  })
       }



})

var authMe=asynchandler(async(req,res)=>{

  const token = req.headers['authorization'];
  console.log(token)
  if (!token) {
    res.status(403).json({ "msg": "No token Provided" });
  }

  try {
    const decode = jwt.verify(token.split(" ")[1], JWT_SECRET);
    console.log("decode",decode)
    const users = await userModel.findOne({"user_id":decode._id}).select("-password")
    console.log('users: ', users)
    res.status(200).json(users);
  }

  catch (err) {
    console.log(err);
    res.status(200).json({"message":"Invalid Token"});

    console.log("Invalid Token");
  }
})
module.exports={
    insertData,
    getalldata,
    findData,
    authMe
}
