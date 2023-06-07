import { Navigate, useLocation } from "react-router-dom";
import { AuthPaths } from "../../routes/paths";
import React from "react";
import { isAuthenticated } from "../../utils/auth";

const AuthGuard = ({ children }) => {
  const location = useLocation();

  if (isAuthenticated()) {
    return <>{children}</>;
  }
  return <Navigate to={AuthPaths.SIGNIN} state={{ from: location }} replace />;
};

export default AuthGuard;
