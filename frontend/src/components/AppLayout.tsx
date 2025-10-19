import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout:React.FC<any>=({ logout, logvalue, user, userImage })=>{
    return(
        <>
        <div>
       <Header logout={logout} logvalue={logvalue} user={user} userImage={userImage}/>
        <Outlet/>
        <Footer/>
        </div>
        </>
    )
}
export default AppLayout;