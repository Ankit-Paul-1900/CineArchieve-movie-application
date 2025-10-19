import { useEffect,useState,useRef } from "react";
import axios from "axios";
import "../Popular.css";
import "./MovieVideo.css";
import { NavLink } from "react-router-dom";
const MovieVideo:React.FC<any>=({data="All", movieid})=>{
    const [movievideos,setMovievideos]=useState<any>([]);
    const [backdrops,setBackdrops]=useState<any>([]);
    const [movieimages,setMovieimages]=useState<any>([]);
    const [scrollvalue,setScrollvalue]=useState<number>(0);
    const allsliderref=useRef<any>();
    const imageURL='https://image.tmdb.org/t/p/w500';
    useEffect(()=>{
        const options = {
            method: 'GET',
            url: `https://cinearchieve-movie-application-1.onrender.com/movies/videos/${movieid}`,
          };
          const optionimages = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieid}/images`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDhkYWIyMjI4NjRhMTEyZjRlOWYzNDJlZGVkODhkYiIsIm5iZiI6MTczNDc1MzM2OS4zMTYsInN1YiI6IjY3NjYzYzU5YjY3ZTQ1NDcyNTVlMGUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jftBC5O2Hmp4oq-h5CYCei8mkzRLhfNwi4EwwOfXnaE'
            }
          };
          
          axios
            .request(optionimages)
            .then(res =>{
                setBackdrops(res.data.backdrops)
                setMovieimages(res.data.posters)
                console.log(backdrops)
            } )
            .catch(err => console.error(err));
          
          axios
            .request(options)
            .then(res => {
                setMovievideos(res.data.data.results)
                console.log(movievideos)
            })
            .catch(err => console.error(err));
            // setBool(true);
    },[movieid]);


    const allprevclicked=()=>{
        if(scrollvalue>0)
        {
          setScrollvalue(scrollvalue-100);
        }
        else
        {
          setScrollvalue(0);
        }
       
      allsliderref.current.scrollLeft-=scrollvalue;
      allsliderref.current.style.transform = `translateX(-${scrollvalue}px)`;
  
  
      };   
      const allnextclicked=()=>{
        const maxscroll=parseInt(allsliderref.current.scrollWidth) - parseInt(allsliderref.current.offsetWidth);
        if(scrollvalue<=maxscroll){
  
          setScrollvalue(scrollvalue+100);
        }
  
      allsliderref.current.scrollLeft+=scrollvalue;
      allsliderref.current.style.transform = `translateX(-${scrollvalue}px)`;
  
    };
               
                        
                            switch (data){
                                case "Videos":

                                    return(
                                        <>
                                          <div className="slider-container media">
                                          <div className="slider"  ref={allsliderref} key="AllMovies">  
                                         {
                                            movievideos.map((item:any)=>{
                                                    return(
                                                        <>
                                                        
                                                       
                                                      <NavLink to={"https://www.youtube.com/embed/"+item.key} className="Link">
                                                      <button
                                                      className="movieLink"
                                                     
                                                      >
                                                        </button>
                                                     
                                                        <iframe
                                                      height="305"
                                                      width="500"
                                                      src={"https://www.youtube.com/embed/"+item.key}
                                                     
                                                      
                                                      >

                                                      </iframe>
                                                      </NavLink>
                                                      
                                                        </>
                                                    )
                                            })
                                         }
                                         </div>
                                            <button className="nav-btn media-btn" id="prev" onClick={allprevclicked}>❮</button>
                                            <button className="nav-btn media-btn" id="next" onClick={allnextclicked}>❯</button>
                                        </div>
                                            </>
                                    )
                                case "Backdrops":
                                    return(
                                        <>
                                            
                                            
                                            <div className="slider-container">
                                            <div className="slider"  ref={allsliderref} key="AllMovies">  
                                            {
                                              backdrops.map((item:any)=>{
                                                return(

                                                  <div className="card-media">

                                                <img src={imageURL+item.file_path} alt="No Image Found" />
                                                </div>
                                                )
                                              })
                                            }
                                            
                                            </div>
                                            <button className="nav-btn  media-btn" id="prev" onClick={allprevclicked}>❮</button>
                                            <button className="nav-btn media-btn" id="next" onClick={allnextclicked}>❯</button>
                                        </div>
                                        </>
                                    )
                                case "Posters":
                                  return(
                                    <>
                                        
                                        
                                        <div className="slider-container">
                                        <div className="slider"  ref={allsliderref} key="AllMovies">  
                                        {
                                          movieimages.map((item:any)=>{
                                            return(

                                              <div className="card-media">

                                            <img src={imageURL+item.file_path} alt="No Image Found" height={300} />
                                            </div>
                                            )
                                          })
                                        }
                                        
                                        </div>
                                        <button className="nav-btn media-btn" id="prev" onClick={allprevclicked}>❮</button>
                                        <button className="nav-btn media-btn" id="next" onClick={allnextclicked}>❯</button>
                                    </div>
                                    </>
                                )
                                default:

                                    return(
                                        <>
                                            
                                            <div>All</div>
                                            </>
                                    )
                                
                            }

                        

                       
        
    
}
export default MovieVideo;