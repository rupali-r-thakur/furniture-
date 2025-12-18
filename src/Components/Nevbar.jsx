import { useState } from "react";
import logoImg from "../Images/logo.jpg";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";

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
            <a href="/" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="/contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
          <li>
            <a href="/gallery" onClick={closeMenu}>
              Gallery
            </a>
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
