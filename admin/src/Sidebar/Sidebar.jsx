import "./sidebar.css";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to={"/add"} className={"acitve" ? "sidebar-option" : "active"}>
          <img src={assets.add_icon} alt="add-icon" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to={"/list"} className="sidebar-option">
          <img src={assets.order_icon} alt="order-icon" />
          <p>List Item</p>
        </NavLink>
        <NavLink to={"/orders"} className="sidebar-option">
          <img src={assets.order_icon} alt="order-icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
