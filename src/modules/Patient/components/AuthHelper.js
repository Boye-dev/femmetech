import React from "react";
import { getDecodedJwt } from "../../../utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const AuthHelper = () => {
  const decodedUser = getDecodedJwt();
  console.log(decodedUser);
  if (decodedUser.role === "PATIENT") {
    return <Outlet />;
  } else {
    return (
      <>
        <Navigate to={"/signin"} replace />
      </>
    );
  }
};

export default AuthHelper;
