const multer=require('multer');
const express=require("express");
 const router= express.Router()
const userController=require("../controller/usercontroller")
const uploadStorage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+Math.floor(Math.random()*9999)+file.originalname);
    },
    destination:'./public/uploads/' 
})
const imageObj=multer({
    storage:uploadStorage
})
router.get("/",userController.getalldata);
router.post("/",imageObj.single('user_image'),userController.insertData);
router.post("/login",userController.findData);
router.post("/me",userController.authMe);
 module.exports=router;
