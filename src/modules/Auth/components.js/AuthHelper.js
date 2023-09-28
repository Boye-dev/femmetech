import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { Roles } from "../../../constants/roles";
import { ConsultantPaths, PatientPaths } from "../../../routes/paths";
import { getDecodedJwt } from "../../../utils/auth";

const AuthHelper = () => {
  const decodedUser = getDecodedJwt();
  if (decodedUser?.role === "PATIENT") {
    return <Navigate to={PatientPaths.PATIENT_FEED} replace />;
  } else if (decodedUser?.role === "CONSULTANT") {
    return <Navigate to={ConsultantPaths.CONSULTANT_FEED} replace />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default AuthHelper;
