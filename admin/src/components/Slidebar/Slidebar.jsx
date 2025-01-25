import React from "react";
import "./Slidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Slidebar = () => {
  return (
    <div className="slidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-options">
          <img src={assets.add_icon} alt="" />
          <p>Add To Menu</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-options">
          <img src={assets.order_icon} alt="" />
          <p>List Item</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-options">
          <img src={assets.order_icon} alt="" />
          <p>Order</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Slidebar;
