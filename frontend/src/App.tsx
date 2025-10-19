import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
// import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { useEffect } from 'react';
import { Suspense } from 'react';
import SearchMovie from './components/SearchMovie';
import Upcoming from './components/Upcoming';
import TopRated from './components/TopRated';
import About from './components/About';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  // const [count, setCount] = useState(0)
  const Home = React.lazy(() => import('./components/Home/Home'));
const Popular = React.lazy(() => import('./components/Popular'));
const SingleMovie = React.lazy(() => import('./components/MovieComponents/SingleMovie'));
const FullMovieCast = React.lazy(() => import('./components/MovieComponents/FullMovieCast'));
  // const [islogin,setIslogin]=useState<boolean>(false);
  // const [username,setUsername]=useState<string>("");

  const [user, setUser] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
  const [logvalue, setLogvalue] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("cineUser");
    if (token) {
      setLogvalue(true);
      // Optional: fetch user info here if token is valid
    } else {
      setLogvalue(false);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("cineUser");
    setUser(null);
    setUserImage(undefined);
    setLogvalue(false);
  };
  // const LoggedIn=()=>{
  //   setIslogin(true);
  // }

  // const getUser=(user:any)=>{
  //    setUsername(user)
  // }

  // const LoggedOut=()=>{
  //   setIslogin(false);
  // }
  return (
    <>
     {/* <Header/> */}
     {/* <Home/> */}
     <BrowserRouter>
     <Suspense fallback={<div>Loading...</div>}>
     <Routes>
      <Route path="/login" element={<LoginPage setUser={setUser} setLogvalue={setLogvalue}  setUserImage={setUserImage}/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route element={<ProtectedRoute />}>
             <Route path="/" element={<AppLayout  logout={handleLogout}
              logvalue={logvalue}
              user={user}
              userImage={userImage}/>}>
                  <Route path="/" element={<Home/>} />
                  <Route path="/movies" element={""}>
                    <Route path="/movies/popular" element={<Popular/>} /> 
                    <Route path="/movies/upcoming" element={<Upcoming/>} /> 
                    <Route path="/movies/toprated" element={<TopRated/>} /> 
                    <Route path="/movies/:id" element={<SingleMovie/>} /> 
                    <Route path="/movies/:id/cast" element={<FullMovieCast/>} />
                  </Route> 
                  <Route path="/about" element={<About/>}/>
                  <Route path="/search/:query" element={<SearchMovie/>}/>
              </Route>
      </Route>
        {/* <Route path="/login" element={<LoginLayout/>}> */}

            {/* <Route path="/login" element={<Login getuser={getUser} loginIn={LoggedIn} />}/> */}
          {/* </Route> */}
     </Routes>
     </Suspense>
     </BrowserRouter>
    </>
  )
}

export default App
