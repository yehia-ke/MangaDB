import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!mobileNumber || !password) {
            setError("Mobile number and password are required.");
            return;
        }

        try {
            // Make POST request to the API
            const response = await axios.post("https://localhost:7281/api/login/validate", {
                mobileNumber,
                password
            });

            if (response.status === 200) {
                // Successful login
                setMessage(response.data.message);
                setError(null);
            }
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a status code
                if (error.response.status === 401) {
                    setError("Invalid mobile number or password.");
                } else {
                    setError("An error occurred while processing the login request.");
                }
            } else {
                // Something else happened
                setError("Network error. Please try again.");
            }
            setMessage(null);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    );
};

export default LoginForm;
