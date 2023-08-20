import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { Roles } from "../../../constants/roles";
import { PatientPaths } from "../../../routes/paths";
import { getDecodedJwt } from "../../../utils/auth";

const AuthHelper = () => {
  const decodedUser = getDecodedJwt();
  if (true) {
    return <Navigate to={PatientPaths.PATIENT_DASHBOARD} replace />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default AuthHelper;
