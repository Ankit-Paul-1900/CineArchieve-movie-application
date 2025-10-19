import {  useParams,NavLink } from "react-router-dom";
import {format} from "date-fns";
import axios from "axios";
import "./SingleMovie.css";
import { useEffect,  useState } from "react";

import Cast from "./Cast";
import MovieVideo from "./MovieVideo";
import RecommendMovies from "./RecommendMovies";
const SingleMovie=()=>{
  
    const param=useParams();
    // const buttonRef=useRef<any>();
    const imageURL='https://image.tmdb.org/t/p/w500';

    const [movie,setMovie]=useState<any>({});
    const [movievideos,setMovievideos]=useState<any>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);

    const [bool,setBool]=useState<boolean>(false);
    // let trailer:any=[];
    useEffect(()=>{
      setIsLoading(true);
        const options = {
            method: 'GET',
            url: `https://cinearchieve-movie-application-1.onrender.com/movies/details/${param.id}`,
           
          };
          const optionstrailer =  {
            method: 'GET',
            url: `https://cinearchieve-movie-application-1.onrender.com/movies/videos/${param.id}`,
          };
          
          Promise.all([
                 axios.request(options),
                 axios.request(optionstrailer)
          ])
          .then(([movie,videos])=>{
                setMovie(movie.data.data);
                setMovievideos(videos.data.data.results)
               

                setBool(true);

          })
          .catch((err)=>{
            console.error("Error fetching data:", err);
          })
          .finally(() => {
            setIsLoading(false);

          });





    
},[param.id]);
const trailerKey =
movievideos.find(
  (item:any) => item.type === "Trailer" && item.name.includes("Official Trailer")
)?.key || "Key not found";


const handleLoad = () => {
  setBool(!bool); // Set the clicked state
};
const backgroundImagestyles={
  backgroundImage:`url(${imageURL}${movie.backdrop_path})`
 
  
}

const release_date=movie?.release_date||"Date Not Found";
const genre=movie?.genres||"Genres not found";
const language=movie?.spoken_languages||"Language Not Found"
 const [mediaoption ,setMediaOption]=useState<string>("Videos");
 
 const [buttonValue,setButtonValue]=useState<string>("videos");

 if(!isLoading){


    return(
        <>
       <div className="maincontainer">
            <div className="herocontent" style={backgroundImagestyles}>
              {
                movie?
                (
                  <>
                  <img src={imageURL+movie.poster_path} alt=""  />
                  <div className="moviedetails">
                    <h3 className="movietitle">
                    {
                      movie.original_title
                    }   
                    <span>
                      {
                        " ("+release_date.substring(0,4)+")"
                      }
                    </span>
                    </h3>
                    <h4 className="runtime">
                      {
                     +

                        (Math.floor( movie.runtime%60)==0)?
                        (
                           "Runtime:"+Math.floor( movie.runtime/60)+"hr "
                        ):
                        "Runtime:"+Math.floor( movie.runtime/60)+"hr "+ (Math.floor( movie.runtime%60)+"mins")
                      
                      }
                        <NavLink to={"https://www.youtube.com/embed/"+trailerKey} >
                      <button className="btntrailer">
                        Trailer
                        </button>
                        </NavLink>
                    </h4>
                   
                       {
                        <ul className="genres" style={{listStyle: "none"}}>
                          {
                            genre=="Genres not found"?(
                           
                              <li>Genres not found</li>
                            
                          ):(

                            genre.map((item:any)=>{
                              return(
                                
                                <li key={item.id}>
                                  {item.name}
                                </li>
                                )
                              })
                            )
                            
                          }
                        </ul>
                       }
                      
                        <p className="tagline">
                          {
                            movie.tagline
                          }
                        </p>
                        <p className="overviewlabel">Overview</p>
                        <p className="overview">
                         
                          {
                            movie.overview
                          }
                          </p>
                        
                    
                </div>
                  </>
                ):(
                  <div>
                   <p>
                    Data Not Found
                    </p> 
                  </div>
                )
              }
              
              
            </div>
            <div className="bodysection">
                <div className="movieinfo">
                  <label htmlFor="" className="Cast">Movie Cast</label>
                  <Cast movieid={param.id}/>
                  <NavLink to={`/movies/${param.id}/cast`} className="fullcast">Full Cast & Crew</NavLink>
                  <hr />
                  <div className="moviemedia">
                    <div className="media-options">
                      <label htmlFor="">Media</label>
                      <button value="videos" className="option-btn"
                      onClick={()=>{
                        setButtonValue("videos");
                        setMediaOption("Videos");
                      }}
                       style={{borderBottom: buttonValue == "videos" ? "3px solid white" : "",color: buttonValue == "videos" ?  "#f3f3f3":""}}
                       >Videos</button>
                      
                      <button value="backdrops" className="option-btn" 
                       onClick={()=>{
                        setButtonValue("backdrops");
                        setMediaOption("Backdrops");

                      }}
                       style={{borderBottom: buttonValue == "backdrops" ? "3px solid white" : "",color: buttonValue == "backdrops" ?  "#f3f3f3":""}}>Backdrops</button>
                      
                      <button value="posters" className="option-btn"  
                      onClick={()=>{
                        setButtonValue("posters");
                        setMediaOption("Posters");

                      }}
                       style={{borderBottom: buttonValue == "posters" ? "3px solid white" : "",color: buttonValue == "posters" ?  "#f3f3f3":""}}>Posters</button>
                    </div>
                    <MovieVideo data={mediaoption} movieid={param.id}/>
                  </div>
                </div>
                <div className="othermoviesinfo">
                  <label htmlFor="">Status</label>
                  <p>{movie.status}</p>
                  <label htmlFor="">Release Date</label>
                  <p>{
                  release_date=="Date Not Found"?
                  "Date Not Found":
                  format(new Date(release_date), "MMMM d, yyyy")}</p>
                  <label htmlFor="">Original Language</label>
                  <p>{
                    language=="Language Not Found"?
                    "Language Not Found":
                    language.find((item:any)=>{
                      return (
                        item.iso_639_1==movie.original_language
                      )
                    })?.english_name||"Not Known"
                    }</p>
                 
                  <label htmlFor="">Recommended Movies</label>
                  <RecommendMovies movieid={param.id} load={handleLoad}/>
                  
                </div>
            </div>
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
export default SingleMovie;


{/* <iframe
width="560"
height="315"
src="https://www.youtube.com/embed/IoyJOL5WnvQ"
allow="autoplay; encrypted-media"
allowFullScreen
></iframe>
<p>
<iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${trailerKey}`}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                      ></iframe>
  <Link to="https://www.youtube.com/embed/IoyJOL5WnvQ">Go</Link>
</p> */}