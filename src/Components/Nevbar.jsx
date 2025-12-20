import { useState } from "react";
import logoImg from "../Images/logo.jpg";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="main_container">
      <div className="logo">
        <img src={logoImg} alt="Website Logo" />
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <nav className={menuOpen ? "mobile_version" : "menu"}>
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/gallary" onClick={closeMenu}>
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
      {/* Social Icons (desktop only) */}
      <div className="socialContact">
        <ul>
          <li id="instagram">
            <FaInstagram />
          </li>
          <li id="facebook">
            <CiFacebook />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
