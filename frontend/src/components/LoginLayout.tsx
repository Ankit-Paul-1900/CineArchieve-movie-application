import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";

const LoginLayout=()=>{
    return(
        <>
        <div>
       <Header/>
        <Outlet/>
        
        </div>
        </>
    )
}
export default LoginLayout;