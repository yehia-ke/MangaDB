import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const CustomerRoute = ({ children }) => {
  const { user } = useSession();

  if (user?.role !== "user") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default CustomerRoute;
