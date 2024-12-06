import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import styles from "./loginpage.module.css";


const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useSession();
  const navigate = useNavigate();

  const setError = async(err) => {
    alert(err);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mobileNumber || !password) {
      setError("Mobile number and password are required.");
      return;
    }

    setLoading(true);

    //Hard coded credentials
    if (mobileNumber === "admin" && password === "admin") {
      login({ mobileNumber, role: "admin" });
      setLoading(false);
      navigate("/admin");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7281/api/login/validate", {
        mobileNumber,
        password,
      });

      if (response.status === 200) {
        login({ ...response.data, role: "user", mobileNumber: mobileNumber });
        setLoading(false);
        navigate("/customer");
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
      <img src="src/assets/logo.png" alt="logo" className={styles.logo} />
      <h2>Welcome</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="mobileNumber" className={styles.floatingLabel}>
            Mobile Number
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="password" className={styles.floatingLabel}>
            Password
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className={styles.signUpPrompt}>
        Don't have an account? <span className={styles.signUpLink} onClick={() => navigate("/signup")}>Sign Up</span>
  </p>
    </div>
  );
};

export default LoginPage;
