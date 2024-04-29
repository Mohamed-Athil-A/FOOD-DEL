import React, { useContext, useState } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  const { url, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newurl = url;
    if (currentState === "Login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }
    const response = await axios.post(newurl, data);
    // console.log(response);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="cross-icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-input">
          {currentState !== "Login" && (
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Your Name"
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Your E-mail"
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Your Password"
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p className="span">
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p className="span">
            Already have an account{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
