import { NavLink } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { useRef, useState } from "react";
import Logo from "./Logo";

interface HeaderProps {
  logout: () => void;
  logvalue: boolean; // true if user is logged in
  user: string | null;
  userImage?: string;
}

const Header: React.FC<HeaderProps> = ({ logout, logvalue, user, userImage }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchRef.current) setQuery(searchRef.current.value);
  };
  console.log("LOGVALUE",logvalue,"\n",user);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <Logo />
          {/* <span className="ms-2">CineArchive</span> */}
        </NavLink>

        {/* Hamburger toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            {/* Movies Dropdown */}
            <li className="nav-item dropdown">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"
                }
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Movies
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/movies/popular">
                    Popular
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/movies/toprated">
                    Top Rated
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/movies/upcoming">
                    Upcoming
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          {/* Search bar */}
          <form className="d-flex me-3" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Movie Name"
              aria-label="Search"
              ref={searchRef}
              onKeyUp={handleSearch}
            />
            <NavLink to={`/search/${query}`} className="btn btn-warning text-dark">
              <IoMdSearch />
            </NavLink>
          </form>

          {/* Login/Profile */}
          {!logvalue ? (
            <NavLink to="/login" className="btn btn-outline-warning my-2">
              Login
            </NavLink>
          ) : (
            <div className="d-flex align-items-center gap-4 my-2">
              {userImage ? (
                <img
                  src={userImage}
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "35px", height: "35px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="bg-warning text-dark rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "35px", height: "35px", fontWeight: "bold" }}
                >
                  {user?.substring(0, 2).toUpperCase()}
                </div>
              )}
              <button className="btn btn-outline-warning" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
