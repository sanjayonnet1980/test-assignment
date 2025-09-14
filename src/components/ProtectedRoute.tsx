import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;