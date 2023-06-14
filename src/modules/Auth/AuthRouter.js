import { Roles } from "../../constants/roles";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
// import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PatientPaths } from "../../routes/paths";
import Home from "../../pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { SignupContextProvider } from "../../context/SignupContext";

function Auth() {
  const { userDetails } = useAuthenticatedUser();

  if (userDetails && userDetails?.role === Roles.PATIENT) {
    return <Navigate to={PatientPaths.PATIENT_DASHBOARD} replace />;
  }
  return (
    <SignupContextProvider>
      <Routes>
        <Route path="" element={<Navigate to="home" replace />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/signin" exact element={<Signin />} /> 
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </SignupContextProvider>
  );
}

export default Auth;
