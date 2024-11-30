import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const AdminRoute = ({ children }) => {
  const { user } = useSession();

  if (user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
