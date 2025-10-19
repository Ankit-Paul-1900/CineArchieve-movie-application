const express=require("express");
 const mongoose= require("mongoose");
 const userModel= new mongoose.Schema({
      "user_id":{
        type:String,
        require:[true,"User id is required"]
    },
    "user_name":{
        type:String,
        require:[true,"User name is required"]
    },
   
    "user_pass":{
        type:String,
        require:[true,"Password is required"]
    },
    "user_email":{
        type:String,
        require:[true,"User email is required"]
    },
    "user_image":{
        type:String,
        require:[true,"User image is required"]
    }
 })

 module.exports=mongoose.model("userSchema",userModel,"userCollection")