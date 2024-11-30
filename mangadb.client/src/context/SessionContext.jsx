import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for session management
const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Store user data
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
