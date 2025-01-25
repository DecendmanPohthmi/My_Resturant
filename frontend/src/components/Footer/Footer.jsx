import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { FaInstagram, FaFacebook } from 'react-icons/fa';


const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Thank you for visiting our website! We’re dedicated to bringing you
            the best experience, whether you’re exploring our menu or placing an
            order. Stay connected with us for updates, offers, and more. We look
            forward to serving you again soon!
          </p>
          <div className="footer-social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon instagram" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon facebook" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>SET IN TOUCH</h2>
            <ul>
                <li>+91 5679-6789-99</li>
                <li>gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 My_Resturant.com - All Right Reserved</p>
    </div>
  );
};

export default Footer;
