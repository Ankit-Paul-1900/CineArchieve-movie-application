import {useEffect,useState } from "react";
import axios from 'axios';
 import { NavLink } from "react-router-dom";
import"./RecommendMovies.css";
const RecommendMovies:React.FC<any>=({movieid,load})=>{
    const [similarmovie,setSimilarmovie]=useState<any>([]);
    const imageURL='https://image.tmdb.org/t/p/w500';

    useEffect(()=>{

const options = {
  method: 'GET',
  url: `https://cinearchieve-movie-application-1.onrender.com/movies/recommended/${movieid}`,
 
};

axios
  .request(options)
  .then(res => {console.log(res.data.data.results)
                setSimilarmovie(res.data.data.results.slice(0,10))
                console.log(similarmovie) 
  })
  .catch(err => console.error(err));
    },[movieid])
     return (
        <>
        <div className="gallery-cont">
            <div className="gallery">
                {
                    similarmovie.map((item:any)=>{
                        return(
                            <>
                                <div className="gall-card">
                                    <img src={imageURL+item.poster_path} alt="" width={100} height={100}/>
                                    <div className="text">
                                    <NavLink
                                    to={"/movies/"+item.id} onClick={load} className="Link">
                                    <label >{item.original_title}</label>
                                    <p>{item.release_date?.split("-")[0]||"Date Not Found"}</p>
                                    </NavLink>    
                                    </div>

                                </div>
                            </>
                        )
                    })
                }
            </div>

        </div>
        </>
     )
}
export default RecommendMovies;