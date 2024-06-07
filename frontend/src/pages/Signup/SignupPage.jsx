import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, isStrongPassword } from "validator";
import { signup } from "../../services/authentication";
import DOMpurify from "dompurify";
import "./Signup.css";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    let CleanEmail = DOMpurify.sanitize(email);
    let CleanPassword = DOMpurify.sanitize(password);
    let CleanUsername = DOMpurify.sanitize(username);
    console.log(CleanEmail);
    event.preventDefault();

    if (CleanUsername.length < 5) {
      setError("Username must be at least 5 characters.");
      return;
    }

    if (!isEmail(CleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(CleanPassword)) {
      setError("Password must be at least 8 characters long, with at least one special character,one uppercase and one lower case.");
      return;
    }

    try {
      await signup(CleanEmail, CleanPassword, username);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      console.log(err);
      if (err.message === "Username already exists") {
        setError("Username already exists. Please enter a valid email address.");
      }else if (err.message === "Email already exists") {
        setError("Email already exists. Please enter a valid email address.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <h2 className="signup">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
        <input
          type="text"
          required=""
          autoComplete="off"
          placeholder="Username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        </div>
        <div className="inputGroup">
        <input
          required=""
          autoComplete="off"
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="email"></label>
        </div>
        <div className="inputGroup">
        <input
          required=""
          autoComplete="off"
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="password"></label>
        </div>
        <br />
        {error && <p className="error">{error}</p>}
        <input className="submit" role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
