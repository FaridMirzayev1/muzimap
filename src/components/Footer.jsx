// Footer.jsx (alternative without react-icons)
import React from "react";
import "./Footer.css";

const Footer = () => {
  const handleQuickLink = (item) => {
    alert(`${item} feature will be available soon!`);
  };

  return (
    <footer className="muzi-footer">
      <div className="footer-gradient-overlay"></div>
      <div className="footer-content">
        {/* ... other sections remain the same ... */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li onClick={() => handleQuickLink("New Releases")}>
              New Releases
            </li>
            <li onClick={() => handleQuickLink("Genres")}>Genres</li>
            <li onClick={() => handleQuickLink("Charts")}>Charts</li>
            <li onClick={() => handleQuickLink("Podcasts")}>Podcasts</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            <li onClick={() => handleQuickLink("Profile")}>Profile</li>
            <li onClick={() => handleQuickLink("Settings")}>Settings</li>
            <li onClick={() => handleQuickLink("Help")}>Help</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li>
              <a href="./">Home</a>
            </li>
            <li>
              <a href="/aboutus">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/premium">Go Premium</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer">
              <img
                className="icon-i icon"
                src="https://static.vecteezy.com/system/resources/previews/042/148/632/non_2x/instagram-logo-instagram-social-media-icon-free-png.png"
                alt=""
              />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer">
              <img
                className="icon-f icon"
                src="https://cdn3d.iconscout.com/3d/free/thumb/free-facebook-3d-icon-download-in-png-blend-fbx-gltf-file-formats--meta-logo-social-media-pack-logos-icons-5753419.png?f=webp"
                alt=""
              />
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <img
                className="icon-t icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png"
                alt=""
              />
            </a>
          </div>
          <div className="app-download">
            <button
              className="download-btn"
              onClick={() => handleQuickLink("App Store")}>
              <span className="store-icon">🍏</span> App Store
            </button>
            <button
              className="download-btn"
              onClick={() => handleQuickLink("Google Play")}>
              <span className="store-icon">🤖</span> Google Play
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Muzi Map. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
