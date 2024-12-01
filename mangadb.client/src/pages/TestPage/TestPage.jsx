import { useEffect, useState } from "react";
import "../general.module.css";

function TestPage() {
    const [connectionMessage, setConnectionMessage] = useState("");  // State to store success message
    const [errorMessage, setErrorMessage] = useState("");  // State to store error message

    // Run the test on initial load
    useEffect(() => {
        testDatabaseConnection();
    }, []);

    // Content rendering based on the connection state
    const content = connectionMessage ? (
        <p style={{ color: "green" }}>{connectionMessage}</p>  // Display success message in green
    ) : errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>  // Display error message in red
    ) : (
        <p>
            <em>Testing connection... Please make sure the ASP.NET backend is running.</em>
        </p>  // Default message while testing
    );

    return (
        <div>
            <h1>Database Connection Test</h1>
            <p>This component demonstrates testing the connection to the database.</p>
            {content}  // Display content (success/error/default message)
        </div>
    );

    // Function to test the database connection by calling the API
    async function testDatabaseConnection() {
        try {
            // Log the test attempt
            console.log("Attempting to test the database connection...");

            // Make an API call to test the connection
            const response = await fetch("https://localhost:7281/api/test/test-connection");

            // If the response is OK, set the success message
            if (response.ok) {
                const data = await response.json();  // Parse the response once
                console.log("Response Status:", response.status);
                console.log("Response Body:", data);

                setConnectionMessage(data.message);  // Set the success message
            } else {
                // If the response is not OK, show an error message
                const errorData = await response.json();
                setErrorMessage(errorData.message || "An error occurred while testing the connection.");
            }
        } catch (error) {
            // Catch any network errors and display the error message
            console.error("Error during connection test:", error);  // Log the error
            setErrorMessage("Failed to connect to the server. Please check your backend.");
        }
    }
}

export default TestPage;
