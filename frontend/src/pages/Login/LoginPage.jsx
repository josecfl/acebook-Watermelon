import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import DOMpurify from "dompurify";
import "./Login.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const CleanEmail = DOMpurify.sanitize(email);
    const CleanPassword = DOMpurify.sanitize(password);

    try {
      const token = await login(CleanEmail, CleanPassword);
      localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
      navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h2 className="login">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroupLogin">
          <input
            type="text"
            required=""
            autoComplete="off"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="email"></label>
        </div>
        <div className="inputGroupLogin">
          <input
            type="password"
            required=""
            autoComplete="off"
            placeholder="Password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="password"></label>
        </div>
        <br />
        <input className="submit" role="submit-button" id="submit" type="submit" value="Submit" />
        <div className="Space">
        <br />
        </div>
      </form>
    </>
  );
};
