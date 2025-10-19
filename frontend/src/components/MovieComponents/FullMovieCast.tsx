import { useParams,  useNavigate } from "react-router-dom";
import "./FullMovieCast.css"
import { useEffect,useState } from "react";
import axios from "axios";
const FullMovieCast=()=>{
    const movieid=useParams();
    const navigate = useNavigate();
    const[cast,setCast]=useState<any>([])
    const[crew,setCrew]=useState<any>([])
    const[movies,setMovies]=useState<any>({})
    const[isLoading,setIsLoading]=useState<boolean>(false);
    const imageURL='https://image.tmdb.org/t/p/w500';

    useEffect(()=>{
        setIsLoading(true);
        const options = {
            method: 'GET',
            url: `https://cinearchieve-movie-application-1.onrender.com/movies/fullcast/${movieid.id}`,
           
          };
          const movieoptions = {
            method: 'GET',
            url: `https://cinearchieve-movie-application-1.onrender.com/movies/details/${movieid.id}`,
            
          };
          Promise.all(
            [
          axios.request(options),
          axios.request(movieoptions)
                
            ]).then(([cast,movie])=>{
                setCast(cast.data.data.cast);
                setCrew(cast.data.data.crew);
                setMovies(movie.data.data)
            })
          
            .catch(err =>
                 console.error("Error fetching data:",err)
                )
            .finally(()=>{
                setIsLoading(false);
              console.log("crew" ,crew);

            });
                 
              },[])


    

  const unique_crew=crew&&[...new Set(crew.map((item:any)=>item.department))]||"Data Not Found";  
  console.log(unique_crew)          
  const release_date=movies?.release_date||"Date Not Found";
  const goBack = () => {
    navigate(-1); // Goes back to the previous page
  };
  if(!isLoading){
    return(
        <>
        <div className="cast-container">
            <div className="movie-name-cont">
                <button onClick={goBack} className="left-btn">{"<"}</button>
                <img src={imageURL+movies.poster_path} alt=""  height={100} width={100}/>
                <label htmlFor="" className="movieName">
                   { movies.original_title}
                </label>
                <span className="year"> {" ("+release_date.substring(0,4)+")"}</span>
            </div>
            <div className="cast-crew">
                <div className="cast-section">
                    <label htmlFor="">Movie Cast</label>
                    {
                        cast.map((item:any)=>{
                            return(
<>
                                <div className="card-fullcast" key={item.id}>
                                <img src={imageURL+item.profile_path} alt=""  height={100} width={100}/>
                                <div className="person">
                                    <h2 className="originalname">{item.original_name}</h2>
                                    <h4 className="character">{item.character}</h4>
                                </div>

                            </div>
</>
                            )
                        })
                    }
                </div>
                <div className="crew-section">
                <label htmlFor="">Crew</label>
                {
                    unique_crew.map((item:any)=>{
                        return(
                            <>
                            <h3>{item}</h3>
                            {
                                  crew.filter((new_p:any)=>{ return new_p.department===item}).map((person:any)=>{
                                    return(
        <>
                                        <div className="card-fullcast" key={person.id}>
                                        <img src={imageURL+person.profile_path} alt=""  height={100} width={100}/>
                                        <div className="person">
                                            <h2 className="originalname">{person.original_name}</h2>
                                            <h4 className="job">{person.job}</h4>
                                        </div>
        
                                    </div>
        </>
                                    )
                                })
                            }
                            </>
                        )
                    })
                }

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
export default FullMovieCast;