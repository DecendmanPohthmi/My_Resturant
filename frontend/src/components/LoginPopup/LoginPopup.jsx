import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios"; // Import axios for making API calls

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5173/api/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Save the token to localStorage or context
        localStorage.setItem("token", response.data.token);
        setShowLogin(false); // Close the login popup
        window.location.reload(); // Refresh the page to update the UI
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(
        "http://localhost:5173/api/user/register",
        {
          name,
          email,
          password,
        }
      );
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        window.location.reload();
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        setError(err.response.data.message || "Something went wrong. Please try again.");
      } else if (err.request) {
        setError("No response from the server. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-popup">
      <form
        className="login-popup-container"
        onSubmit={currState === "Login" ? handleLogin : handleSignUp}
      >
        <div className="login-popup-tittle">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "sign-up" && (
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">
          {currState === "sign-up" ? "Create Account" : "Login"}
        </button>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("sign-up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an Account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;