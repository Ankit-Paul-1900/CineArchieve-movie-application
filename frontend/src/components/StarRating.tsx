import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./StarRating.css";
interface abc{
    star:number;
}
const StarRating:React.FC<abc>=({star})=>{
    return(
        <>
   { 
          Array.from({length:5},(_,index)=>{
            let number=index+0.5;
        
              return(
                  <>
                  
              <span key={index}>
                  {

                      star>=index+1?(
                          <FaStar className="Star"/>
                      ):star>=number?(
                          <FaStarHalfAlt className="Star"/>
                      ):(
                      <FaRegStar className="Star"/>
                      )

                      
                      
                    }
              </span>
                    
                    
              </>
          )
          })
    }
    <label htmlFor="" className="rating">{star}</label>
  </>
)
}
export default StarRating;