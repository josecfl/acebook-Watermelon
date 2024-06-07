import { Link } from "react-router-dom";

import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home">
      <h1 className="title">Welcome to Acebook!</h1>
      <div className="box-container">
      <Link to="/signup" className="box sign-up-box">Sign Up</Link>
      <Link to="/login" className="box log-in-box">Log In</Link>
      </div>
    </div>
  );
};
