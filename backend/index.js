const express= require("express");
const app=express();
const cors=require('cors');

const port=3000;app.use(express.json());
const DATABASE=require("./schema/mongodb");
const movieroute=require("./routes/movie_routes")
const userRouter=require("./routes/user_routes")

DATABASE()
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Node js is running");
})
app.use(express.static("public"));
app.use("/movies",movieroute);
app.use("/users",userRouter);
app.listen("3000");
console.log("Nodejs is running at port 3000");