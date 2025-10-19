import React, { useState, FormEvent, useEffect } from "react";
import { Film, Upload } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "danger" | null }>({
    text: "",
    type: null,
  });

  const navigate = useNavigate();

  // 🔁 Auto-clear message after 3s
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 🖼️ Handle Image Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🧾 Handle Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "danger" });
      return;
    }

    const formData = new FormData();
    formData.append("user_name", name);
    formData.append("user_email", email);
    formData.append("user_pass", password);
    if (image) formData.append("user_image", image);

    try {
      const response = await fetch("https://cinearchieve-movie-application-1.onrender.com/users/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Registration failed");
      const data = await response.json();

      console.log("Registration success:", data);
      setMessage({ text: "Registration successful! Redirecting...", type: "success" });

      // Wait 1.5s then navigate
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      setMessage({ text: "Something went wrong during registration.", type: "danger" });
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setImage(null);
    setPreview("");
  };

  const messageClasses = message.type === "success" ? "alert-success" : "alert-danger";

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-0"
      style={{
        backgroundColor: "#000",
        backgroundImage: "radial-gradient(circle at top, #111 0%, #000 100%)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
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

      <div className="container-fluid px-3 px-sm-4 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div
              className="card p-4 p-md-5 border-0 shadow-lg"
              style={{
                background: "linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.95))",
                borderRadius: "1rem",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Header */}
              <div className="text-center mb-4">
                <Film size={48} color="#ffc107" className="mb-2" />
                <h1 className="h3 fw-bold text-warning mb-1">CineArchive</h1>
                <p className="text-secondary mt-1 small">
                  Create your CineArchive account 🎞️
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Profile Image Upload */}
                <div className="mb-4 d-flex flex-column">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="rounded-circle mb-3"
                      style={{ width: "80px", height: "100px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center mb-3 border border-secondary rounded-circle"
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#111",
                      }}
                    >
                      <Upload color="#6c757d" size={28} />
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    className="form-control bg-dark text-white border-secondary"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ borderRadius: "0.5rem" }}
                  />
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-light fw-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control form-control-lg bg-dark text-white border-secondary"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ borderRadius: "0.5rem" }}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-light fw-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg bg-dark text-white border-secondary"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ borderRadius: "0.5rem" }}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-light fw-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg bg-dark text-white border-secondary"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ borderRadius: "0.5rem" }}
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label text-light fw-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control form-control-lg bg-dark text-white border-secondary"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Register
                </button>
              </form>

              {/* Footer */}
              <div className="text-center mt-4">
                <p className="small text-secondary mb-0">
                  Already have an account?{" "}
                  <NavLink to={"/login"} className="text-warning fw-medium text-decoration-none">
                    Sign in
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

export default RegisterPage;
