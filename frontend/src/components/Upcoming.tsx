import { useEffect, useState } from "react";
import axios from 'axios';
// import "./Popular.css";
import "./Upcoming.css";
import StarRating from "./StarRating";
import Pagination from "./Pagination";
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Upcoming=()=>{
    const imageURL='https://image.tmdb.org/t/p/w500';
    const [currentPage, setCurrentPage] = useState(1);
    const [totalitems, setTotalitems] = useState(1);

    const [isLoading,setIsLoading]=useState<boolean>(false);

    useEffect(()=>{
      setIsLoading(true);
      const options = {
        method: 'GET',
        url: 'https://cinearchieve-movie-application-1.onrender.com/movies/upcoming',
               params: {
                 page: currentPage,
                 limit:14
        }
};

axios
  .request(options)
  .then((res:any) =>{
      setPopularMovies(res.data.data);
      setPages(res.data.totalPages);
     setTotalitems(res.data.totalDocs)

    }
    )
  .catch(err => console.error(err))
  .finally(()=>{
    setIsLoading(false);
  });
    },[currentPage])

    const [popularMovies,setPopularMovies]=useState<any>([]);
    const [pages,setPages]=useState<number>(0);
  const totalItems = Math.ceil(totalitems/10); // Total number of items
  const itemsPerPage = 14; // Items per page

  const handlePageChange = (page:any) => {
    
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
  
    }
  };

  const favourites:boolean=false;


    if(
      !isLoading
    ){

        return(
        <>
      
    <div className="upcoming-content">

        <label htmlFor="" className="heading">Upcoming Movies</label>
        <div className="card-grid">
        {
            popularMovies.map((item:any)=>{
                return(
                    <>
                  <Link to={"/movies/"+item.id} style={{textDecoration:"none"}}>
                    <div className="card-upcoming">
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
export default Upcoming;