import { useEffect, useState } from "react";
import axios from 'axios';
import "./Popular.css";
import StarRating from "./StarRating";
import Pagination from "./Pagination";
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Popular=()=>{
    const imageURL='https://image.tmdb.org/t/p/w500';
    const [currentPage, setCurrentPage] = useState(1);
    const [totalitems, setTotalitems] = useState(1);
    const [isLoading,setIsLoading]=useState<boolean>(false);

    useEffect(()=>{
      setIsLoading(true)
       const options = {
                   method: 'GET',
               url: 'https://cinearchieve-movie-application-1.onrender.com/movies/popular',
               params: {
                 page: currentPage,
                 limit:21
    // with_genres: '28%7C12'28||12
          },
          // headers: {
          // accept: 'application/json',
          // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDhkYWIyMjI4NjRhMTEyZjRlOWYzNDJlZGVkODhkYiIsIm5iZiI6MTczNDc1MzM2OS4zMTYsInN1YiI6IjY3NjYzYzU5YjY3ZTQ1NDcyNTVlMGUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jftBC5O2Hmp4oq-h5CYCei8mkzRLhfNwi4EwwOfXnaE'
          // }
};

axios
  .request(options)
  .then((res:any) =>{
      setPopularMovies(res.data.data);
      setPages(res.data.totalPages)
     setIsLoading(false)
     setTotalitems(res.data.totalDocs)
    }
)
    
  .catch(err => {
    console.error("Error fetching data:", err);   }
  ).finally(() => {
    setIsLoading(false)
  });
    },[currentPage])

    const [popularMovies,setPopularMovies]=useState<any>([]);
    const [pages,setPages]=useState<number>(0);
  const totalItems = Math.ceil(totalitems/100); // Total number of items
  const itemsPerPage = 21; // Items per page

  const handlePageChange = (page:any) => {
    
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
      
    
    }
  };

  const favourites:boolean=false;

   if(!isLoading){

    return(
        <>
    <div className="popular-content">

        <label htmlFor="" className="heading">Popular Movies</label>
        <div className="card-grid">
        {
            popularMovies.map((item:any)=>{
                return(
                    <>
                  <Link to={"/movies/"+item.id} style={{textDecoration:"none"}}>
                    <div className="card-popular">
                        <img src={imageURL+item.poster_path} alt="No Image Found" height={250+"px"} width={100+"%"}/>
                        <div className="card-content">
                          <div className="rating_cont">
                              <p>
                                <StarRating star={Math.floor(item.vote_average)*0.5}/>
                              </p>
                              {
                                favourites?(
                                  <FaHeart className="heart"/>
                                ):
                                <FiHeart className="heart"/>
                                
                              }
                          </div>
                            <h3>{item.original_title}</h3>
                        </div>
                    </div>
                  </Link>
                    </>
                )
            })
        }

        </div>
        <Pagination 
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {/* <div className="content">
        <p>
          Showing items {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}.
        </p>
      </div> */}
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
export default Popular;