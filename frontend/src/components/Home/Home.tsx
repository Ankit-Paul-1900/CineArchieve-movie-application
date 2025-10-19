import { useEffect,  useState } from "react";
import { NavLink } from "react-router-dom";
import './Home.css';
import Image from "../Images/heroImage.jpg";
import Trending from "./Trending";
import HPopular from "./HPopular";
import HUpcoming from "./HUpcoming";
const Home=()=>{
  const [isLoading,setIsLoading]=useState<boolean>(false);
    useEffect(()=>{
     setIsLoading(true);
     setTimeout(()=>{
       setIsLoading(false);

     },2000);
      
    },[])
       const [buttonValue,setButtonValue]=useState<string>("day");
    
    if(!isLoading){
    
    return(
      <>
      <div className="homeContainer">

        <div className="hero-content" style={{backgroundImage:`url(${Image})`}}>
        <label htmlFor="">Explore the World of Movies with Us — Welcome to CineArchive!</label>
        </div>

                <div className="body-container">

        {/* Trending Section */}
        <div className="trending-heading">
        <label htmlFor="" className="headings">{"Trending   "}</label>
        <button onClick={()=>{setButtonValue('day')}}  value="today" style={{ borderBottom: buttonValue == "day" ? "3px solid white" : "",color: buttonValue == "day" ?  "#f3f3f3":""}}
 >Today</button>
        <button onClick={()=>{setButtonValue("week") ;
          console.log(buttonValue)}}  style={{ borderBottom: buttonValue == "week" ? "3px solid white" : "" ,color: buttonValue == "week" ?  "#f3f3f3":""}}>Week</button>
        </div>
        <Trending value={buttonValue}/>
        {/* Popular Section */}
        <NavLink to="/movies/popular" style={{textDecoration:"none",color:"white",marginBottom:20+"px"}}>
        <label htmlFor="" className="headings">Popular Movies  {">"}</label>
        </NavLink>
        <HPopular/>     
            {/* Upcoming Sections  */}
            <NavLink to="/movies/upcoming" style={{textDecoration:"none",color:"white",marginBottom:20+"px"}}>

            <label htmlFor="" className="headings">Upcoming Movies {">"}</label>
            </NavLink>
            <HUpcoming/>
              
              
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
export default Home;

























