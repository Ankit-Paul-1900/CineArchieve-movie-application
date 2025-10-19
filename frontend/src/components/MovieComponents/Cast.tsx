import axios from "axios";
import { useEffect, useState,useRef } from "react";
import "./Cast.css";

const Cast:React.FC<any>=({movieid})=>{
    // const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [cast,setCast]=useState<any>([]);
    // const [crew,setCrew]=useState<any>([]);
    const imageURL='https://image.tmdb.org/t/p/w500';
    const [scrollvalue,setScrollvalue]=useState<number>(0);
    const allsliderref=useRef<any>();
    useEffect(()=>{
        

const options = {
  method: 'GET',
  url: `https://cinearchieve-movie-application-1.onrender.com/movies/cast/${movieid}`
  
};

axios
  .request(options)
  .then(res => {
    setCast(res.data.data.cast);
    // setCrew(res.data.crew);
})
  .catch(err => console.error(err));
       
    })


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
              cast.map((item:any)=>{
                return(
                  <>
                <div className="cast-card" key={"all-"+item.id} id={item.id} >
                  <div className="img-cont">
                    <img src={imageURL+item.profile_path} height={350+"px"} width={150+"px"}  alt="NoImage Found"/>
                  </div>
                  <div className="persondetail">
                    <label htmlFor="" className="personname">{item.original_name}</label>
                  </div>
                  <label htmlFor="" className="character">{item.character}</label>
              </div>
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
export default Cast;