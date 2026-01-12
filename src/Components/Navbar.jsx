import { useState, useEffect } from "react";
import logoImg from "../Images/logo.png";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { Link, useNavigate, useLocation } from "react-router-dom";

import LoginModal from "../Pages/LoginModal";
import SignupModal from "../Pages/SignupModal";

import { logoutUser } from "../Services/authService";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goToSection = (path, id) => {
    navigate(path);
    setMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeAllModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      setShowLogout(false);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // ================= AUTH STATE =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentUser({
            uid: user.uid,
            ...docSnap.data(),
          });
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="main_container">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logoImg} alt="Website Logo" />
        <div className="logo_text">
          <h1>
            N<span className="highlight">est</span>C
            <span className="highlight">reative</span>
          </h1>
          <p>INTERIOR DESIGNING</p>
        </div>
      </div>

      {!isAdminPage && (
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      )}
      {!isAdminPage && (
        <nav className={menuOpen ? "mobile_version" : "menu"}>
          <ul>
            <li>
              <Link onClick={() => goToSection("/", "home")}>Home</Link>
            </li>
            <li>
              <Link onClick={() => goToSection("/about", "about")}>About</Link>
            </li>
            <li>
              <Link onClick={() => goToSection("/gallery", "gallery")}>
                Gallery
              </Link>
            </li>
            <li>
              <Link onClick={() => goToSection("/contact", "contact")}>
                Contact
              </Link>
            </li>

            <li className="user_wrapper">
              {currentUser ? (
                <div className="user_menu">
                  <div
                    className="user_avatar"
                    onClick={() => setShowLogout(!showLogout)}
                  >
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </div>

                  {showLogout && (
                    <div className="logout_text" onClick={handleLogout}>
                      Logout
                    </div>
                  )}
                </div>
              ) : (
                <button className="login_btn" onClick={openLogin}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
      {isAdminPage && currentUser && (
        <div className="admin_only_avatar">
          <div
            className="user_avatar"
            onClick={() => setShowLogout(!showLogout)}
          >
            {currentUser.name?.charAt(0).toUpperCase()}
          </div>

          {showLogout && (
            <div className="logout_text" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      )}

      {/* SOCIAL ICONS (HIDE ON ADMIN) */}
      {!isAdminPage && (
        <div className="socialContact">
          <ul>
            <li>
              <FaInstagram />
            </li>
            <li>
              <CiFacebook />
            </li>
          </ul>
        </div>
      )}

      {/* MODALS */}
      {showLogin && (
        <LoginModal
          closeModal={closeAllModals}
          openSignup={openSignup}
          onLoginSuccess={(data) => {
            setCurrentUser(data);
            closeAllModals();
            if (data.role === "admin") navigate("/admin");
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          closeModal={closeAllModals}
          openLogin={openLogin}
          onSignupSuccess={(data) => {
            setCurrentUser(data);
            closeAllModals();
          }}
        />
      )}
    </header>
  );
}

export default Navbar;
