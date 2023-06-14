import { Roles } from "../../constants/roles";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
// import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PatientPaths } from "../../routes/paths";
import Home from "../../pages/Home";

function Auth() {
  const { userDetails } = useAuthenticatedUser();

  if (userDetails && userDetails?.role === Roles.PATIENT) {
    return <Navigate to={PatientPaths.PATIENT_DASHBOARD} replace />;
  }
  return (
    <Routes>
      <Route path="" element={<Navigate to="home" replace />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default Auth;
