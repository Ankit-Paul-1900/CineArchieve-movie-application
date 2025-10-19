const express= require("express");
const movieSchema=require("../schema/movieschema")
const {PopularMovie,TopRatedMovie,UpcomingMovie}=require("../schema/movieschema")
const asynchandler= require("express-async-handler");
const axios=require("axios")
const TMDB_API_KEY="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDhkYWIyMjI4NjRhMTEyZjRlOWYzNDJlZGVkODhkYiIsIm5iZiI6MTczNDc1MzM2OS4zMTYsInN1YiI6IjY3NjYzYzU5YjY3ZTQ1NDcyNTVlMGUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jftBC5O2Hmp4oq-h5CYCei8mkzRLhfNwi4EwwOfXnaE"

const getmoviedetail = asynchandler(async (req, res) => {
    let type = req.params.type;

    // Pagination parameters
    const page = parseInt(req.query.page) || 1;      // default page = 1
    const limit = parseInt(req.query.limit) || 10;   // default 10 docs per page
    const skip = (page - 1) * limit;                // documents to skip

    let query;
    console.log(query)
    switch (type) {
        case "popular":
            query = movieSchema.PopularMovie.find();
            break;
        case "toprated":
            query = movieSchema.TopRatedMovie.find();
            break;
        case "upcoming":
            query = movieSchema.UpcomingMovie.find();
            break;
        default:
            return res.status(400).json({ message: "Invalid type. Use 'popular', 'toprated', or 'upcoming'." });
    }

    try {
        const totalDocs = await query.clone().countDocuments(); // total number of documents
        const data = await query.skip(skip).limit(limit).lean().exec(); // paginated docs

        res.status(200).json({
            page,
            limit,
            totalDocs,
            totalPages: Math.ceil(totalDocs / limit),
            data
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const getMovieById = asynchandler(async (req, res) => {
  try {
    const movieId = parseInt(req.params.id); // ensure number
    console.log(movieId)
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movie id" });
    }

       const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}`;

    const response = await axios.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      message: "Movie found",
      data: response.data
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(500).json({ error: err.message });
  }
});



const getVideosbyID = asynchandler(async (req, res) => {
  try {
    const movieId = parseInt(req.params.id); // ensure number
    console.log(movieId)
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movie id" });
    }

       const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

    const response = await axios.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      message: "Videos found",
      data: response.data
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "Movie videos not found" });
    }
    res.status(500).json({ error: err.message });
  }
});

const recommendedmovies=asynchandler(async (req,res)=>{
 try {
    const movieId = parseInt(req.params.id); // ensure number
    console.log(movieId)
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movie id" });
    }

       const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;

    const response = await axios.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      },
  params: {language: 'en-US', page: '1'},

    });

    res.json({
      message: "Videos found",
      data: response.data
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "No recommended movies found" });
    }
    res.status(500).json({ error: err.message });
  }
});


const getCastDetails = asynchandler(async (req, res) => {
  try {
    const movieId = parseInt(req.params.id); // ensure number
    console.log(movieId)
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movie id" });
    }

       const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    const response = await axios.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      message: "Movie cast found",
      data: response.data
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "Movie videos not found" });
    }
    res.status(500).json({ error: err.message });
  }
});

const getFullCastDetails = asynchandler(async (req, res) => {
  try {
    const movieId = parseInt(req.params.id); // ensure number
    console.log(movieId)
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movie id" });
    }

       const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    const response = await axios.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      message: "Movie Cast found",
      data: response.data
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "Movie videos not found" });
    }
    res.status(500).json({ error: err.message });
  }
});

const searchMovie= asynchandler(async (req,res)=>{


    try {
    const query = req.query.query; // ensure number
    console.log(query)
   

       const tmdbUrl = `https://api.themoviedb.org/3/search/movie`;

    const response = await axios.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      },
        params: {query: `${query}`, include_adult: 'false', language: 'en-US', page: '1'},

    });

    res.json({
      message: "Search found",
      data: response.data
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "No such movie found" });
    }
    res.status(500).json({ error: err.message });
  }


});



const getTrendingData = asynchandler(async (req, res) => {
  try {
    const day = req.params.value; // ensure number

       const tmdbUrl = `https://api.themoviedb.org/3/trending/movie/${day}?language=en-US`;

    const response = await axios.get(tmdbUrl, {
      params: {language: 'en-US', page: '1'},
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      message: "Movie found",
      data: response.data
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(500).json({ error: err.message });
  }
});
module.exports={getmoviedetail,getMovieById,recommendedmovies,getVideosbyID,getCastDetails
  ,getFullCastDetails,searchMovie,getTrendingData}