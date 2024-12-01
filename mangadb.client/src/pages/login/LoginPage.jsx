import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import styles from "./loginpage.module.css";

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mobileNumber || !password) {
      setError("Mobile number and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    // Hardcoded admin credentials
    if (mobileNumber === "admin" && password === "admin") {
      login({ mobileNumber, role: "admin" });
      setLoading(false);
      navigate("/admin");
      return;
    }

    try {
      // Example API request for regular users
      const response = await axios.post("https://localhost:7281/api/login/validate", {
        mobileNumber,
        password,
      });

      if (response.status === 200) {
        login({ ...response.data, role: "user" }); // Assume API returns user data
        setLoading(false);
        navigate("/about"); // Redirect regular users
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setError("Invalid mobile number or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
