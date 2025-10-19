const express= require("express");
const moviecontroller=require("../controller/moviecontroller");
const route=express.Router();

route.get("/details/:id",moviecontroller.getMovieById);
route.get("/videos/:id",moviecontroller.getVideosbyID);
route.get("/recommended/:id",moviecontroller.recommendedmovies);
route.get("/cast/:id",moviecontroller.getCastDetails);
route.get("/fullcast/:id",moviecontroller.getFullCastDetails);
route.get("/search",moviecontroller.searchMovie);
route.get("/trending/:value",moviecontroller.getTrendingData);
route.get("/:type",moviecontroller.getmoviedetail);
module.exports=route;