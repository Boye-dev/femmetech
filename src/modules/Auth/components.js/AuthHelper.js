import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuthenticatedUser } from "../../../hooks/useAuthenticatedUser";
import { Roles } from "../../../constants/roles";
import { PatientPaths } from "../../../routes/paths";

const AuthHelper = () => {
  const { userDetails } = useAuthenticatedUser();

  if (userDetails && userDetails?.data.role === Roles.PATIENT) {
    return <Navigate to={PatientPaths.PATIENT_DASHBOARD} replace />;
  } else if (userDetails && userDetails?.role === Roles.DOCTOR) {
    return <Navigate to={PatientPaths.PATIENT_APPOINTMENT} replace />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default AuthHelper;
