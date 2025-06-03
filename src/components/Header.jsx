import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import "./Header.css";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);
  return (
    <header className="music-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            Muzi<span>Map</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu">
          <span className={`menu-icon ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>

        <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/playlists" onClick={() => setMobileMenuOpen(false)}>
                Playlists
              </Link>
            </li>
            <li>
              <Link to="/AboutUs" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/premium" onClick={() => setMobileMenuOpen(false)}>
                Premium
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => {
                  setModalType("login");
                  setShowModal(true);
                  setMobileMenuOpen(false);
                }}
                className="sign-in">
                Log In
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => {
                  setModalType("signup");
                  setShowModal(true);
                  setMobileMenuOpen(false);
                }}
                className="sign-up">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>

        {showModal && (
          <AuthModal
            onClose={() => setShowModal(false)}
            type={modalType}
            setModalType={setModalType}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
