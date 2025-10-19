import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./SearchMovie.css";
import axios from "axios";
const SearchMovie=()=>{
  const searchquery=useParams();
    const [searchmovie,setSearchmovie]=useState<any>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);
  const imageURL='https://image.tmdb.org/t/p/w500';

    useEffect(()=>{
      
      setIsLoading(true)

const options = {
  method: 'GET',
  url: 'https://cinearchieve-movie-application-1.onrender.com/movies/search',
              
  params: {query: `${searchquery.query}`},
 
};

axios
  .request(options)
  .then(res =>{
        setSearchmovie(res.data.data.results);
     setIsLoading(false)
        
      })
        .catch(err => console.error(err))
        .finally(() => {
          setIsLoading(false)
        });
    },[searchquery.query]);

    if(!isLoading){
    return(
        <>
        <div className="main-container">
           <h2>Search Results..</h2>
            {
                searchmovie.map((item:any)=>{
                    return(
                            <>
                              
                               <div className="moviecard" key={item.id}>
                                    <img src={imageURL+item.poster_path} alt="" height={300} />
                                    <NavLink
                                    to={"/movies/"+item.id} className="Link">
                                    <div className="movie-text">
                                    <label >{item.original_title}</label>
                                    <p>{item.release_date?.split("-")[0]||"Date Not Found"}</p>
                                    <p>{item.overview}</p>
                                    </div>
                                    </NavLink>    

                                </div>
                            </>
                    )
                })
            }
          
        </div>        
        </>
     )
    }
    else{
      return(
        <>
          <div className="loading">
            Loading......
          </div>
        </>
      )
    }
}
export default SearchMovie;