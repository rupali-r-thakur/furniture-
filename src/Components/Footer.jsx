import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_about">
          <h2>Furniture</h2>
          <p>
            Quality furniture with modern design. We create comfort for your
            home.
          </p>
        </div>

        <div className="footer_links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/gallary">Gallery</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer_contact">
          <h3>Contact</h3>
          <p>Email: example@gmail.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer_bottom">
        <p>© 2025 Furniture Website | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
