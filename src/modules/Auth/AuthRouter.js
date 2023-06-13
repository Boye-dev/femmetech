import { Roles } from "../../constants/roles";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PatientPaths } from "../../routes/paths";
import { SignupContextProvider } from "../../context/SignupContext";

const paths = [
  {
    path: "signin",
    element: lazy(() => import("./pages/Signin")),
  },
  {
    path: "home",
    element: lazy(() => import("../../pages/Home")),
  },
  {
    path: "signup",
    element: lazy(() => import("./pages/Signup")),
  },
  {
    path: "forgot-password",
    element: lazy(() => import("./pages/ForgotPassword")),
  },
  {
    path: "reset-password",
    element: lazy(() => import("./pages/ResetPassword")),
  },
  {
    path: "verify-user",
    element: lazy(() => import("./pages/SetPassword")),
  },
  {
    path: "forgot-password-notice",
    element: lazy(() => import("./pages/ForgotPasswordNotice")),
  },
  {
    path: "*",
    element: lazy(() => import("../../shared/components/NotFound")),
  },
];

function Auth() {
  const { userDetails } = useAuthenticatedUser();

  if (userDetails && userDetails?.role === Roles.PATIENT) {
    return <Navigate to={PatientPaths.PATIENT_DASHBOARD} replace />;
  }
  return (
    <SignupContextProvider>
      <Routes>
        <Route path="" element={<Navigate to="home" replace />} />
        {paths.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </SignupContextProvider>
  );
}

export default Auth;
