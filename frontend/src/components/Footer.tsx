import Logo from "./Logo";
import "./Footer.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
const Footer=()=>{
    return(
        <>
        <footer>

            <div className="content">
            <Logo/>
           
        <nav className="nav">
          <div className="about-us">
            <span className="footer-heading">ABOUT US</span>
            <p className="about-us-content">
            CineArchive is your ultimate destination for exploring the world of movies.
            Sign up today to rate your favorite films, and connect 
            with fellow movie enthusiasts! 

            </p>
          </div>
            <div className="quicklinks">
            <span className="footer-heading">QUICK LINK</span>

              <ul>
                <li className="link">Home</li>
                <li className="link">About Us</li>
                <li className="link">Popular Movies</li>
                <li className="link">Upcoming Movies</li>
              </ul>
            </div>
            <div className="contact-us">
            <span className="footer-heading">CONTACT US</span>

              <span><FaPhoneAlt />  {"\t"}9874563210</span>
              <span> <MdMail/>  {"\t"}cinearchieve@gmail.com</span>
            </div>
        
        </nav>
            </div>
            <p className="text">
          &copy; {new Date().getFullYear()} CineArchive. All rights reserved.
        </p>
        </footer>
        </>
    )
}
export default Footer;