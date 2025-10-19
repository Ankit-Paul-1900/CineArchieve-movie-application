import axios from "axios";
import { useEffect, useState,useRef } from "react";
import StarRating from "../StarRating";
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

import "./HUpcoming.css";
import { NavLink } from "react-router-dom";

const HUpcoming=()=>{
    // const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [upcoming,setUpcoming]=useState<any>([]);
    // const [favourites,setFavourites]=useState<boolean>(false);
    const favourites:boolean=false;

    const imageURL='https://image.tmdb.org/t/p/w500';
    const [scrollvalue,setScrollvalue]=useState<number>(0);
    const allsliderref=useRef<any>();
    useEffect(()=>{
        

const options = {
        method: 'GET',
        url: 'https://cinearchieve-movie-application-1.onrender.com/movies/upcoming',
        params: { page: '1'}
        
      };

axios
  .request(options)
  .then(res => {
    setUpcoming(res.data.data);
})
  .catch(err => console.error(err));
       
    },[])


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
    return(
        <>
    
  
    <div className="slider-container">
            <div className="slider"  ref={allsliderref} key="AllMovies">
            {
              upcoming.map((item:any)=>{
                return(
                  <>
                  <NavLink to={"/movies/"+item.id} className={"movielink"}>

                <div className="cast-card" key={"all-"+item.id} id={item.id} >
                  <div className="img-cont">
                  <img src={imageURL+item.poster_path} height={350+"px"} width={150+"px"}  alt="NoImage Found"/>

                  </div>
                  <div className="card-content-upcoming">
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
                            <h3 className="upcoming-moviename">{item.original_title}</h3>
                        </div>
                    </div>
                    </NavLink>
                </>
                )
              })
            }
            </div>

            
            <button className="nav-btn cast-btn" id="prev" onClick={allprevclicked}>❮</button>
            <button className="nav-btn cast-btn" id="next" onClick={allnextclicked}>❯</button>
        
          </div>

        </>
    )
}
export default HUpcoming;