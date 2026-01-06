import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const goToSection = (path, id) => {
    navigate(path);

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

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
            <li onClick={() => goToSection("/", "home")}>Home</li>
            <li onClick={() => goToSection("/about", "about")}>About</li>
            <li onClick={() => goToSection("/gallary", "gallary")}>Gallery</li>
            <li onClick={() => goToSection("/contact", "contact")}>Contact</li>
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
