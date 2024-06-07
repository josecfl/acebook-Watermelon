import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFeed = () => {
    navigate("/posts");
  };

  return (
    <nav>
      <div className="navbar">
        {currentPath !== "/profile" && (
          <button className="profile-button" onClick={handleProfile}>
            My Profile
          </button>
        )}
        &nbsp;
        {currentPath !== "/posts" && (
          <button className="feed-button" onClick={handleFeed}>
            Feed
          </button>
        )}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
