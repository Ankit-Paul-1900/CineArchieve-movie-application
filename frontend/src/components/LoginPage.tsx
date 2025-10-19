import React, { useState, FormEvent, useEffect } from "react";
import { Film } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
interface LoginPageProps {
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setLogvalue: React.Dispatch<React.SetStateAction<boolean>>;
  setUserImage:React.Dispatch<React.SetStateAction<string | undefined>>;
}
const LoginPage: React.FC<LoginPageProps> = ({ setUser , setLogvalue, setUserImage }) => {
  const [user_email, setUser_email] = useState<string>("");
  const [user_pass, setUser_pass] = useState<string>("");
  const navigate=useNavigate()
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "danger" | null;
  }>({ text: "", type: null });

  // 🔹 Loading state to prevent FOUC (Flash of Unstyled Content)
  const [isLoading, setIsLoading] = useState(true);

  // Wait until Bootstrap CSS & fonts are loaded
  useEffect(() => {
    const handleLoad = () => {
      // Small delay to allow CSS render fully
      setTimeout(() => setIsLoading(false), 300);
    };

    // If document is already ready, skip listener
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Auto-hide message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // const handleSubmit =async (e: FormEvent<HTMLFormElement>) => {
  //  e.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:3000/users/login", 
  //       { user_email, user_pass },
  //     );

  //     if (response.status != 200) {
  //       const errorData = await response.data;
  //       throw new Error(errorData.message || "Login failed");
  //     }

  //     const data = await response.data.user;
  //     console.log("✅ Login successful:", data);
  //       setUser(data.user_name);
  //       setLogvalue(true);
  //       setUserImage(data.user_image);

  //     // Optional: save token or user info to localStorage
  //     localStorage.setItem("cineUser", response.data.token);

  //     setMessage({ text: "Login successful! Redirecting...", type: "success" });

  //     // Redirect to home after short delay
  //     setTimeout(() => navigate("/"), 1500);
  //   } catch (error: any) {
  //     console.error("❌ Login error:", error);
  //     setMessage({ text: error.message || "Something went wrong.", type: "danger" });
  //   }

  //   setUser_email("");
  //   setUser_pass("");
  
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await axios.post("https://cinearchieve-movie-application-1.onrender.com/users/login", {
      user_email,
      user_pass,
    });

    // If API does not return status 200
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Login failed");
    }

    const data = response.data.user;
    console.log("✅ Login successful:", data);

    // Set user data in React state
    setUser(data.user_name);
    setLogvalue(true);
    setUserImage(data.user_image);

    // Save token to localStorage
    localStorage.setItem("cineUser", response.data.token);

    // Set success message
    setMessage({ text: "Login successful!", type: "success" });

    // ✅ Immediately navigate to home page
    navigate("/");

  } catch (error: any) {
    console.error("❌ Login error:", error);
    setMessage({
      text: error.message || "Something went wrong.",
      type: "danger",
    });
  } finally {
    // Optional: clear form fields after submission
    setUser_email("");
    setUser_pass("");
  }
};
  const messageClasses =
    message.type === "success" ? "alert-success" : "alert-danger";

  // 🌀 Show loading screen until CSS is ready
  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center min-vh-100 p-0"
        style={{
          backgroundColor: "#000",
          color: "#ffc107",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div className="text-center">
          <Film size={60} color="#ffc107" className="mb-3" />
          <h4 className="fw-bold">Loading CineArchive...</h4>
        </div>
      </div>
    );
  }

  // 🔹 Main Login Page after CSS load
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-0"
      style={{
        backgroundColor: "#000",
        backgroundImage:
          "radial-gradient(circle at top, #111 0%, #000 100%)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Notification message */}
      {message.text && (
        <div
          className={`alert ${messageClasses} fixed-top mt-3 mx-auto shadow text-center`}
          style={{
            maxWidth: "90%",
            zIndex: 1050,
            borderRadius: "0.5rem",
          }}
          role="alert"
        >
          {message.text}
        </div>
      )}

      {/* Responsive card container */}
      <div className="container-fluid px-3 px-sm-4 px-md-2">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div
              className="card p-4 p-md-5 border-0 shadow-lg"
              style={{
                background:
                  "linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.95))",
                borderRadius: "1rem",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Header */}
              <div className="text-center mb-5">
                <Film size={48} color="#ffc107" className="mb-2" />
                <h1 className="h3 fw-bold text-warning mb-1">CineArchive</h1>
                <p className="text-secondary mt-1 small">
                  Access your movie collection 🎬
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-100">
                <div className="mb-4 d-flex flex-column">
                  <label
                    htmlFor="email"
                    className="form-label text-light fw-medium text-left" style={{textAlign: "left"}}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg bg-dark text-white border-secondary " 
                    placeholder="user@example.com"
                    value={user_email}
                    onChange={(e) => setUser_email(e.target.value)}
                    required
                    style={{ borderRadius: "0.5rem" }}
                  />
                </div>

                <div className="mb-5 d-flex flex-column">
                  <label
                    htmlFor="password"
                    className="form-label text-light fw-medium text-left" 
                    style={{textAlign: "left"}}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg bg-dark text-white border-secondary"
                    placeholder="••••••••"
                    value={user_pass}
                    onChange={(e) => setUser_pass(e.target.value)}
                    required
                    style={{ borderRadius: "0.5rem" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold py-3 text-dark shadow-sm"
                  style={{
                    borderRadius: "0.75rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  Log In
                </button>
              </form>

              {/* Footer */}
              <div className="text-center mt-4">
                <p className="small text-secondary mb-0">
                  Don’t have an account?{" "}
                  <NavLink
                    to={"/register"}
                    className="text-warning fw-medium text-decoration-none"
                  >
                    Create one
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


