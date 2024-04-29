import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  //useNavigate hook
  const navigate = useNavigate();

  //LOGOUT function
  //After logout we need to remove the token from local storage
  //And user redirect to home page
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    //Refresh the page
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src={assets.logo} alt="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          className={menu === "home" ? "active" : ""}
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>
        <a
          href="#app-download"
          className={menu === "mobile-app" ? "active" : ""}
          onClick={() => setMenu("mobile-app")}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          className={menu === "contact-us" ? "active" : ""}
          onClick={() => setMenu("contact-us")}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search-icon" />
        <div className="navbar-searchicon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="basket-icon" />
          </Link>
          <div className={getTotalCartAmount() > 0 && "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>SignIn </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile-icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="bag-icon" />
                <p>Orders</p>
              </li>

              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logOut-icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
